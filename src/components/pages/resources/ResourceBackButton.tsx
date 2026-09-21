"use client";

import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function ResourceBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`text-xs ${buttonVariants({ variant: "link" })} cursor-pointer`}
    >
      BACK
    </button>
  );
}
