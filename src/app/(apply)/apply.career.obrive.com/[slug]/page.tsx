import React from "react";
import DetailsPage from "@/components/pages/apply/Details";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <div>
      <DetailsPage params={params} />
    </div>
  );
};

export default page;
