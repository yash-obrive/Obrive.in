"use client";

import FONTS from "@/assets/fonts";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CircleUser, Calendar } from "lucide-react";

// ==========================================
// 1. PAGE DATA ARRAYS
// ==========================================

const pageHeader = {
    title: "Our Certifications & Compliance",
    author: "Obrive Industries Private Limited",
    date: "February 28, 2025",
    subtitle: "Building Trust Through Certified Excellence",
};

const layoutRowsData = [
    {
        id: "row-government",
        categoryTitle: "Government / Recognition",
        rowGap: "gap-20",
        groups: [
            {
                id: "startup-india",
                heading: "Startup India Recognition",
                images: [
                    {
                        url: "/certificates/r 1.png",
                        alt: "Startup India Recognition",
                    },
                ],
            },
            {
                id: "msme",
                heading: "Government of India Certification",
                images: [
                    {
                        url: "/certificates/r 2.png",
                        alt: "MSME Micro Small & Medium Enterprises",
                    },
                ],
            },
        ],
    },
    {
        id: "row-trademarks",
        categoryTitle: "",
        rowGap: "gap-15",
        groups: [
            {
                id: "registered-tm",
                heading: "Registered Trademark (TM)",
                images: [
                    { url: "/certificates/Obrive-Icon-Trade-Mark 1.png", alt: "Obrive Trademark B" },
                    { url: "/certificates/Obrive-Logo-Trade-Mark 1.png", alt: "Obrive Trademark Logo" },
                ],
            },
            {
                id: "copyrights",
                heading: "Copyrights",
                images: [
                    { url: "/certificates/Obpark-Trade-Marked 1.png", alt: "Obrive Trademark Seal" },
                    { url: "/certificates/Over-All-Trade-Marked-India 1.png", alt: "Font Copyright" },
                    { url: "/certificates/Over-All-Trade-Marked-India 2.png", alt: "Rights Reserved Copyright" },
                ],
            },
        ],
    },
    {
        id: "row-nic-codes",
        categoryTitle: "",
        rowGap: "gap-12",
        groups: [
            {
                id: "nic-63121",
                heading: "NIC Code 63121",
                subHeading: "Data Processing & Hosting",
                images: [
                    { url: "/certificates/NIC 62091 Compliance Recognition Badge 1.png", alt: "NIC Code 62091" },
                ],
            },
            {
                id: "nic-62099",
                heading: "NIC Code 62099",
                subHeading: "IT & Computer Services",
                images: [
                    { url: "/certificates/NIC 62099 1.png", alt: "NIC Code 62099" },
                ],
            },
            {
                id: "nic-62091",
                heading: "NIC Code 62091",
                subHeading: "Software Development Services",
                images: [
                    { url: "/certificates/NIC 63121 1.png", alt: "NIC Code 63121" },
                ],
            },
        ],
    },
    {
        id: "row-soc-dpdp",
        categoryTitle: "",
        rowGap: "gap-25",
        groups: [
            {
                id: "soc-2",
                heading: "SOC 2 Compliance",
                images: [
                    { url: "/certificates/r3 1.png", alt: "SOC 2 Type II Compliance" },
                ],
            },
            {
                id: "dpdp",
                heading: "DPDP Compliance",
                images: [
                    { url: "/certificates/r3 2.png", alt: "DPDP Type II Compliance" },
                ],
            },
        ],
    },
];

// Last Div Row: ISO Certifications Infinite Slider Data (2 sets x 4 items)
const isoSliderData = {
    sectionTitle: "ISO Certifications",
    gap: "gap-20",
    sets: [
        {
            setId: "set-1",
            images: [
                { id: "iso-9001", url: "/certificates/hs1(1).png", alt: "ISO 9001 Quality Management" },
                { id: "iso-45001", url: "/certificates/hs1(2).png", alt: "ISO 45001 Health & Safety" },
                { id: "iso-27001-v1", url: "/certificates/hs1(3).png", alt: "ISO 27001 Security Management" },
                { id: "iso-27001-v2", url: "/certificates/hs1(4).png", alt: "ISO 27001 Certified" },
            ],
        },
        {
            setId: "set-2",
            images: [
                { id: "iso-9001-dup", url: "/certificates/hs2(1).png", alt: "ISO 9001 Quality Management" },
                { id: "iso-45001-dup", url: "/certificates/hs2(2).png", alt: "ISO 45001 Health & Safety" },
                { id: "iso-27001-v1-dup", url: "/certificates/hs2(3).png", alt: "ISO 27001 Security Management" },
                { id: "iso-27001-v2-dup", url: "/certificates/hs2(4).png", alt: "ISO 27001 Certified" },
            ],
        },
    ],
};

const allIsoImages = isoSliderData.sets.flatMap((set) => set.images);

// ==========================================
// 2. NEXT.JS PAGE COMPONENT
// ==========================================

export default function CertificationsPage() {
    const [currentTile, setCurrentTile] = useState(0);

    // Chunk allIsoImages into groups of 4 for desktop
    const desktopTiles = React.useMemo(() => {
        const result = [];
        for (let i = 0; i < allIsoImages.length; i += 4) {
            result.push({
                images: allIsoImages.slice(i, i + 4)
            });
        }
        return result;
    }, []);

    // Chunk allIsoImages into groups of 2 for mobile
    const mobileTiles = React.useMemo(() => {
        const result = [];
        for (let i = 0; i < allIsoImages.length; i += 2) {
            result.push({
                images: allIsoImages.slice(i, i + 2)
            });
        }
        return result;
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTile((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white  font-sans py-12 px-4 sm:px-8 mt-10">
            {/* Keyframes for seamless infinite sliding */}
            <style>{`
        @keyframes continuousSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-slider {
          animation: continuousSlide 20s linear infinite;
        }
        .animate-infinite-slider:hover {
          animation-play-state: paused;
        }
      `}</style>

            <main className="max-w-5xl mx-auto flex flex-col space-y-12">
                {/* Page Header */}
                <header className="border-b  pb-6">
                    <h1 className={`${FONTS.microgrammaBold.className}  text-[#074139] text-2xl sm:text-3xl text-[#074139] tracking-wide`}>
                        {pageHeader.title}
                    </h1>
                    <div className={`${FONTS.microgrammaBold.className}  text-[#074139] flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px]  font-semibold mt-2`}>
                        <span className="flex items-center gap-1.5 font-semibold text-primary/70">
                            <CircleUser className="h-4 w-4" />
                            {pageHeader.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {pageHeader.date}
                        </span>
                    </div>
                    <p className={`${FONTS.microgrammaBold.className}  text-[#074139] text-sm  font-medium mt-4`}>
                        {pageHeader.subtitle}
                    </p>
                </header>

                {/* Dynamic Image Rows */}
                {layoutRowsData.map((row) => (
                    <React.Fragment key={row.id}>
                        <section className="flex flex-col items-center text-center">
                            {row.categoryTitle && (
                                <h2 className={`${FONTS.microgrammaBold.className}  text-[#074139] text-lg sm:text-xl font-bold  mb-8 self-start`}>
                                    {row.categoryTitle}
                                </h2>
                            )}

                            <div className={`flex flex-wrap justify-center items-start w-full ${row.rowGap}`}>
                                {row.groups.map((group) => (
                                    <div key={group.id} className="flex flex-col items-center max-w-full">
                                        <h3 className={`${FONTS.microgrammaBold.className}  text-[#074139] text-xs sm:text-sm font-bold  mb-1`}>
                                            {group.heading}
                                        </h3>
                                        {group.heading && 'subHeading' in group && group.subHeading && (
                                            <p className={`${FONTS.microgrammaBold.className} text-[#074139] text-xs sm:text-sm font-bold  mb-1`}>
                                                {group.subHeading}
                                            </p>
                                        )}
                                        <div className={`flex flex-wrap items-center justify-center ${row.rowGap || "gap-4"} mt-2`}>
                                            {group.images.map((img, idx) => (
                                                <div key={idx} className={`${group.id === "startup-india" ? "w-[208px] sm:w-[192px] h-[208px] sm:h-[192px]" : "w-[150px] sm:w-[136px] h-[150px] sm:h-[136px]"} flex items-center justify-center`}>
                                                    <img
                                                        src={img.url}
                                                        alt={img.alt}
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <hr className="border-t border-slate-200" />
                    </React.Fragment>
                ))}

                {/* Last Row Div: ISO Certifications Infinite Slider */}
                {/* <section className="flex flex-col items-center text-center pt-2">
                    <p className={`${FONTS.microgrammaBold.className}  text-[#074139] text-sm sm:text-base font-bold  mb-6`}>
                        {isoSliderData.sectionTitle}
                    </p>

                    <div className="w-full overflow-hidden relative">
                        <div className={`flex w-max animate-infinite-slider ${isoSliderData.gap}`}>
                            {allIsoImages.map((img, index) => (
                                <div key={`orig-${index}`} className="w-38 sm:w-34 h-38 sm:h-34 flex-shrink-0 flex items-center justify-center p-1">
                                    <img src={img.url} alt={img.alt} className="max-w-full max-h-full object-contain" />
                                </div>
                            ))}

                            {allIsoImages.map((img, index) => (
                                <div key={`dup-${index}`} className="w-38 sm:w-34 h-38 sm:h-34 flex-shrink-0 flex items-center justify-center p-1">
                                    <img src={img.url} alt={img.alt} className="max-w-full max-h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                <div className="w-full mt-4">
                    <h1 className={`${FONTS.microgrammaBold.className} text-[#074139] text-sm sm:text-base md:text-lg tracking-wide text-center mb-4`}>ISO Certifications</h1>

                    {/* Desktop Slider (Shows 4 large images per tile) */}
                    <div className="hidden sm:block w-full overflow-hidden mx-auto">
                        <div
                            className="flex w-full"
                            style={{
                                transform: `translateX(-${(currentTile % desktopTiles.length) * 100}%)`,
                                transition: `transform 0.8s ease-in-out`,
                            }}
                        >
                            {desktopTiles.map((tile, tileIndex) => (
                                <div
                                    key={tileIndex}
                                    className="w-full shrink-0 flex justify-center"
                                >
                                    <div className="flex rounded-xl bg-white p-5">
                                        <div className={`flex ${isoSliderData.gap || "gap-4"}`}>
                                            {tile.images.map((img, imgIndex) => (
                                                <div
                                                    key={img.id || imgIndex}
                                                    className="relative w-24 sm:w-32 h-24 sm:h-32 shrink-0 "
                                                >
                                                    <Image
                                                        src={img.url}
                                                        alt={img.alt || ""}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Slider (Shows 2 large images per tile) */}
                    <div className="block sm:hidden w-full max-w-[280px] xs:max-w-[320px] overflow-hidden mx-auto">
                        <div
                            className="flex w-full"
                            style={{
                                transform: `translateX(-${(currentTile % mobileTiles.length) * 100}%)`,
                                transition: `transform 0.8s ease-in-out`,
                            }}
                        >
                            {mobileTiles.map((tile, tileIndex) => (
                                <div
                                    key={tileIndex}
                                    className="w-full shrink-0 flex justify-center"
                                >
                                    <div className="flex rounded-xl bg-white p-4">
                                        <div className={`flex gap-8`}>
                                            {tile.images.map((img, imgIndex) => (
                                                <div
                                                    key={img.id || imgIndex}
                                                    className="relative w-30  h-30  shrink-0"
                                                >
                                                    <Image
                                                        src={img.url}
                                                        alt={img.alt || ""}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div >
    );
}