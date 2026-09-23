"use client";

import dynamic from "next/dynamic";

const GoodbyeCardRive = dynamic(() => import("./GoodbyeCardRive"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent animate-pulse rounded-full opacity-10">
      <div className="w-48 h-48 rounded-full bg-primary/20 blur-3xl"></div>
    </div>
  ),
});

const GoodByeCard = () => {
  return (
    <div className="w-full flex items-center my-10 sm:my-20 justify-center px-4">
      <div className="bg-gradient overflow-hidden relative flex flex-col max-sm:-space-y-10 justify-between w-full sm:min-w-[1238px] rounded-xl min-h-[250px] sm:min-h-[300px] md:min-h-[361px]">
        <div className="flex px-4 sm:px-10 py-6 sm:py-6 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl">
            Why Choose Obrive for AR, VR & Spatial Computing
          </h2>
        </div>
        <div className="flex flex-col gap-10 sm:flex-row justify-between">
          <div className="max-sm:hidden flex-1 px-4 sm:px-0 h-full w-full">
            <GoodbyeCardRive className="h-[360px] absolute top-10 -left-48 lg:h-[320px]" />
          </div>
          <div>
            <p className="text-left md:text-right text-xs w-full px-4 sm:px-10 py-6 max-w-full md:max-w-[500px] mt-2 md:mt-6 leading-6">
              Stop limiting your brand with flat, outdated interactions. With
              Obrive Industries, unlock the power of Augmented Reality, Virtual
              Reality, Mixed Reality, 3D Design, and Spatial Computing to
              automate engagement and create immersive experiences that truly
              matter. <br /> #FreeToImagine
            </p>
          </div>

          <div className="sm:hidden w-full px-4 mt-4">
            <GoodbyeCardRive className="h-[280px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodByeCard;
