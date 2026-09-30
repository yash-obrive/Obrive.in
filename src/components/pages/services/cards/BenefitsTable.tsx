import FONTS from "@/assets/fonts";
import { BENEFITS_TABLE } from "@/constants/pages/services/workflow-steps";
import Translate from "@/components/shared/Translate";

export interface BenefitItem {
  benefit?: string;
  title?: string;
  description: string;
}

interface BenefitsTableProps {
  data?: readonly BenefitItem[];
}

const BenefitsTable = ({ data = BENEFITS_TABLE }: BenefitsTableProps) => {
  return (
    <div className="w-full">
      <div className="hidden md:inline-block">
        <div className="bg-white border border-zinc-300 rounded-lg shadow-sm overflow-hidden">
          <table className="w-[700px]">
            <thead className="border-b border-zinc-300">
              <tr>
                <th
                  className={`text-start px-6 py-3 font-semibold text-sm text-gray-800 border-e border-zinc-300 ${FONTS.microgrammaBold.className}`}
                >
                   <Translate text="Benefit" /> </th>
                <th
                  className={`text-start px-6 py-3 font-semibold text-sm text-gray-800 ${FONTS.microgrammaBold.className}`}
                >
                   <Translate text="Description" /> </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr
                  key={item.benefit || item.title || i}
                  className="border-b border-zinc-300 last:border-b-0"
                >
                  <td className="align-top w-[170px] px-6 py-4 border-e border-zinc-300">
                    <div
                      className={`text-sm ${FONTS.microgrammaBold.className}`}
                    >
                      <Translate text={item.benefit || item.title || ""} />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-600 leading-relaxed">
                      <Translate text={item.description} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {data.map((item, i) => (
          <div
            key={item.benefit || item.title || i}
            className="bg-white border border-zinc-300 rounded-lg shadow-sm overflow-hidden"
          >
            <div
              className={`border-b border-zinc-300 px-4 py-3 text-sm text-gray-800 ${FONTS.microgrammaBold.className}`}
            >
              <Translate text={item.benefit || item.title || ""} />
            </div>
            <div className="px-4 py-3">
              <div className="text-xs text-gray-600 leading-relaxed">
                <Translate text={item.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsTable;
