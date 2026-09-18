import Image from "next/image";
import FONTS from "@/assets/fonts";
import { CaseStudy } from "@/lib/case-studies";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import SectionHeader from "@/components/shared/layout/SectionHeader";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

const CaseStudyDetail = ({ caseStudy }: CaseStudyDetailProps) => {
  const isConfidential = caseStudy.client_raw?.includes("Confidential");
  
  return (
    <article className="bg-white min-h-screen pb-20">
      <FadeInOnView>
        <FullWidthSection backgroundColor="none">
          <div className="flex mt-40 items-center flex-col gap-10 max-xl:mt-32 max-lg:mt-28 max-md:mt-20 max-sm:mt-26 max-md:gap-8 px-4">
            
            {/* Meta Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="bg-primary/5 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                {caseStudy.service}
              </span>
              <span className="bg-primary/5 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                {caseStudy.focus}
              </span>
              {isConfidential && (
                <span className="bg-primary/5 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Enterprise Client
                </span>
              )}
            </div>

            {/* Title */}
            <div className="w-full max-w-5xl">
              <h1 className={`${FONTS.microgrammaBold.className} text-center text-primary text-5xl max-xl:text-4xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl leading-tight`}>
                {caseStudy.title}
              </h1>
            </div>
            
            {/* Client Info */}
            {!isConfidential && (
              <div className="text-secondary/60 text-sm font-medium tracking-wide uppercase">
                Client: {caseStudy.client}
              </div>
            )}
            
            {/* Overview Box */}
            <div className="flex items-center relative w-full max-w-5xl max-lg:flex-col max-lg:items-stretch max-lg:gap-6 mt-6">
              <div className="flex flex-col w-[350px] lg:w-[400px] items-start gap-2.5 pt-[25px] pb-2.5 px-6 relative self-stretch rounded-2xl border-[0.5px] border-solid border-primary/40 max-lg:w-full">
                <div className="relative w-fit mt-[-2.00px] font-normal text-sm text-zinc-500 uppercase tracking-widest">
                  Overview
                </div>
              </div>

              <div className="flex flex-col items-start justify-center gap-2.5 px-8 pt-6 pb-8 relative flex-1 ml-[-1px] max-lg:ml-0 rounded-2xl border-[0.5px] border-solid border-primary/40 max-lg:w-full overflow-hidden">
                <p className="font-normal text-base tracking-[0.5px] leading-8 text-secondary/80 w-full break-words">
                  {caseStudy.overview}
                </p>
              </div>
            </div>
          </div>
        </FullWidthSection>
      </FadeInOnView>
      
      {/* Featured Image */}
      <FadeInOnView>
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 mb-24">
          <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-gray-100 relative">
            <Image
              src={`/images/case-studies/${caseStudy.image}`}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </FadeInOnView>

      <FullWidthSection backgroundColor="none">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* Challenge */}
          <FadeInOnView>
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="md:col-span-4">
                <SectionHeader title="The Challenge" />
              </div>
              <div className="md:col-span-8">
                <p className="text-lg text-secondary/80 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
            </div>
          </FadeInOnView>

          {/* Strategic Approach */}
          <FadeInOnView>
            <div className="space-y-12">
              <SectionHeader title="Strategic Approach" />
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudy.approach.map((step, idx) => (
                  <div key={idx} className="p-8 rounded-2xl border-[0.5px] border-primary/20 bg-white">
                    <h3 className="text-lg font-bold mb-3 text-primary">{step.title}</h3>
                    <p className="text-secondary/70 leading-relaxed text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnView>

          {/* Solution Architecture Table */}
          <FadeInOnView>
            <div className="space-y-12">
              <SectionHeader title="Solution Architecture" />
              <div className="overflow-x-auto rounded-2xl border-[0.5px] border-primary/20">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-primary/5 text-primary">
                      <th className="p-5 font-bold border-b border-primary/10 w-1/4 text-sm uppercase tracking-wider">Layer</th>
                      <th className="p-5 font-bold border-b border-primary/10 w-1/3 text-sm uppercase tracking-wider">Delivery</th>
                      <th className="p-5 font-bold border-b border-primary/10 text-sm uppercase tracking-wider">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseStudy.architecture.map((layer, idx) => (
                      <tr key={idx} className="border-b last:border-0 border-primary/10 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-bold text-secondary text-sm">{layer.layer}</td>
                        <td className="p-5 text-secondary/80 text-sm">{layer.delivery}</td>
                        <td className="p-5 text-secondary/70 text-sm">{layer.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeInOnView>

          {/* Tech Stack & Deliverables */}
          <FadeInOnView>
            <div className="grid md:grid-cols-2 gap-12 p-10 md:p-14 rounded-3xl border-[0.5px] border-primary/20 bg-gradient shadow-sm">
              <div>
                <h3 className={`${FONTS.microgrammaBold.className} text-xl mb-6 text-primary uppercase tracking-widest`}>Deliverables</h3>
                <ul className="space-y-4">
                  {caseStudy.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-secondary/80 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`${FONTS.microgrammaBold.className} text-xl mb-6 text-primary uppercase tracking-widest`}>Technology</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.techStack.flatMap(stack => stack.split(", ")).map((tech, idx) => (
                    <span key={idx} className="bg-white border-[0.5px] border-primary/20 px-4 py-2 rounded-full text-xs font-medium text-secondary">
                      {tech.replace(".", "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeInOnView>

          {/* Impact & Results */}
          <FadeInOnView>
            <div className="space-y-12">
              <SectionHeader title="Business Impact" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5">
                {caseStudy.impacts.map((impact, idx) => (
                  <div key={idx} className="text-center px-3 py-5 lg:px-4 lg:py-6 bg-white rounded-2xl border-[0.5px] border-primary/20 flex flex-col items-center justify-start overflow-hidden w-full">
                    <div className={`${FONTS.microgrammaBold.className} text-base md:text-lg lg:text-xl text-primary mb-3 w-full`}>
                      {impact.metric}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 border-b border-primary/10 pb-2 w-full break-words">
                      {impact.label}
                    </div>
                    <p className="text-[11px] text-secondary/60 leading-relaxed break-words w-full">
                      {impact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnView>

          {/* Testimonial */}
          <FadeInOnView>
            <div className="bg-primary text-white p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden text-center max-w-4xl mx-auto">
              <div className="relative z-10 flex flex-col items-center">
                <svg className="w-10 h-10 text-white/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl md:text-2xl font-light leading-relaxed mb-10 max-w-3xl">
                  "{caseStudy.testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-lg tracking-wide uppercase">{caseStudy.testimonial.author}</p>
                  {isConfidential && (
                    <p className="text-white/60 text-sm mt-1">Enterprise Client</p>
                  )}
                </div>
              </div>
            </div>
          </FadeInOnView>


        </div>
      </FullWidthSection>
    </article>
  );
};

export default CaseStudyDetail;
