import type React from "react";
import FONTS from "@/assets/fonts";

interface CareerItemType {
  title?: string | React.ReactNode;
  description: string | React.ReactNode;
}

interface CareerSectionProps {
  title?: string | React.ReactNode;
  items?: CareerItemType[];
  children?: React.ReactNode;
}

export function CareerItem({ title, children }: { title?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div>
      {title && (
        <h3
          className={`${FONTS.microgrammaBold.className} text-primary text-lg mb-2`}
        >
          {title}
        </h3>
      )}
      <div className="text-sm leading-relaxed [&>ul]:list-disc [&>ol]:list-decimal">
        {children}
      </div>
    </div>
  );
}

export default function CareerSection({ title, items, children }: CareerSectionProps) {
  return (
    <section>
      {title && (
        <h2
          className={`${FONTS.microgrammaBold.className} text-primary text-3xl mb-6`}
        >
          {title}
        </h2>
      )}
      <div className="space-y-6">
        {children ? (
          children
        ) : (
          items?.map((item, index) => (
            <div key={index}>
              {item.title && (
                <h3
                  className={`${FONTS.microgrammaBold.className} text-primary text-lg mb-2`}
                >
                  {item.title}
                </h3>
              )}
              {typeof item.description === "string" ? (
                <p className="text-sm leading-relaxed">{item.description}</p>
              ) : (
                <div className="text-sm leading-relaxed [&>ul]:list-disc [&>ol]:list-decimal">
                  {item.description}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
