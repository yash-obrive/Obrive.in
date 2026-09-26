"use client";

import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Translate from "@/components/shared/Translate";

export default function ResourceBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`text-xs ${buttonVariants({ variant: "link" })} cursor-pointer`}
    >
       <Translate text="BACK" /> </button>
  );
}
