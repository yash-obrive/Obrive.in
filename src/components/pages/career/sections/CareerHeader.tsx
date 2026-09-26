import FONTS from "@/assets/fonts";
import Translate from "@/components/shared/Translate";

interface CareerHeaderProps {
  title: string;
  location: string;
  postedOn: string;
  employmentType: string;
  salaryRange: string;
}

export default function CareerHeader({
  title,
  location,
  postedOn,
  employmentType,
  salaryRange,
}: CareerHeaderProps) {
  return (
    <div className="mb-8">
      <h1
        className={`${FONTS.microgrammaBold.className} text-primary text-4xl mb-4`}
      >
        {title}
      </h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm leading-relaxed text-gray-700 max-w-3xl">
           <Translate text="Location:" /> {location}
        </p>
        <p className="text-sm leading-relaxed text-gray-700 max-w-3xl">
           <Translate text="Posted On:" /> {postedOn}
        </p>
        <p className="text-sm leading-relaxed text-gray-700 max-w-3xl">
           <Translate text="Employment Type:" /> {employmentType}
        </p>
        <p className="text-sm leading-relaxed text-gray-700 max-w-3xl">
           <Translate text="Salary Range:" /> {salaryRange}
        </p>
      </div>
    </div>
  );
}
