import { useTranslation } from "@/context/TranslationContext";
import { notFound, redirect } from "next/navigation";
import FONTS from "@/assets/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllCareerSlugs, getCareerBySlug } from "@/lib/mdx";
import Translate from "@/components/shared/Translate";

export async function generateStaticParams() {
  const slugs = await getAllCareerSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);

  if (!career) {
    notFound();
  }

  async function handleSubmit(formData: FormData) {
    "use server";

    const _name = formData.get("name") as string;
    const _email = formData.get("email") as string;

    redirect(`/apply.career.obrive.in/${slug}/more`);
  }
  return (
    <div className="min-h-screen flex flex-col gap-30 items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center mb-5">
        <h1
          className={`${FONTS.microgrammaBold.className}
         tracking-wider text-4xl mb-10 font-extrabold text-primary`}
        >
           <Translate text="Let’s get started!" /> </h1>
        <p className="text-gray-800 mb-6">
          <span className={`${FONTS.microgrammaBold.className}`}><Translate text="Obrive" /></span>{" "}
           <Translate text="has invited you to interview for the position of" /> <br />
          <span className={`${FONTS.microgrammaBold.className}`}>
            {career.metadata.title}
          </span>
           <Translate text=". Enter your name and email address to get started." /> </p>

        <form
          action={handleSubmit}
          className="flex flex-col items-center space-y-6 mt-10"
        >
          {/* Name Input */}
          <div className="w-full text-start">
            <Label htmlFor="name" className="text-sm mb-1">
               <Translate text="Name" /> </Label>
            <Input
              type="text"
              name="name"
              placeholder={"Type your name here..."}
              className="w-full border-b-2 focus-visible:ring-0 border-x-0 border-t-0 rounded-none border-primary focus:outline-none py-2"
              required
            />
          </div>

          {/* Email Input */}
          <div className="w-full text-start">
            <Label htmlFor="email" className="text-sm mb-1">
               <Translate text="Email" /> </Label>
            <Input
              type="email"
              name="email"
              placeholder={"Type your email address here..."}
              className="w-full border-b-2 focus-visible:ring-0 border-x-0 border-t-0 rounded-none border-primary focus:outline-none py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size={"lg"} className="mt-6 cursor-pointer">
             <Translate text="GET STARTED" /> </Button>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;
