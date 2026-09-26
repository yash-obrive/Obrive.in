import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const revalidateSecret =
      process.env.REVALIDATION_SECRET || "obrive-cms-secret";

    if (secret !== revalidateSecret) {
      return NextResponse.json(
        { message: "Invalid revalidation token" },
        { status: 401 },
      );
    }

    const tag = req.nextUrl.searchParams.get("tag");
    const path = req.nextUrl.searchParams.get("path");

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    // Default: revalidate resources collection
    revalidatePath("/[country]/resources", "page");
    return NextResponse.json({
      revalidated: true,
      message: "Revalidated all regional resources",
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { message: "Error during revalidation", error: message },
      { status: 500 },
    );
  }
}
