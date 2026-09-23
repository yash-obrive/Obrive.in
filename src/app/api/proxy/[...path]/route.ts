import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Ensure Node.js does not reject expired SSL certificates from the legacy backend
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function proxy(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    const params = await Promise.resolve(context.params);
    const path = params.path ? params.path.join("/") : "";
    const search = req.nextUrl.search;

    const backendUrl =
      process.env.BACKEND_INTERNAL_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://api.obrive.com");

    const targetUrl = `${backendUrl}/api/${path}${search}`;

    const headers = new Headers();
    req.headers.forEach((value, key) => {
      // Don't forward host or connection headers to avoid reverse-proxy conflicts
      if (key.toLowerCase() !== "host" && key.toLowerCase() !== "connection") {
        headers.set(key, value);
      }
    });

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.arrayBuffer()
        : undefined;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
    });

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        responseHeaders.append(key, value);
      } else {
        responseHeaders.set(key, value);
      }
    });

    const responseBody = await response.arrayBuffer();

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Proxy error" },
      { status: 502 },
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
