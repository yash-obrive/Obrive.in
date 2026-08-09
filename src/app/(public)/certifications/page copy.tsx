"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import PrimaryLogo from "@/components/shared/logo/PrimaryLogo";
import FONTS from "@/assets/fonts";
import { CircleUser, Calendar } from "lucide-react";
import { FadeInOnLoad, FadeInOnView, StaggerOnView, StaggerItem } from "@/components/shared/motion/Motion";

interface CertificateRow {
    gap: number;
    images: string[];
}

interface CertificateTile {
    images: string[];
}

interface CertificateScroller {
    gap: number;
    scrollDuration: number;
    tiles: CertificateTile[];
}

export default function CertificatesPage() {
    const [currentTile, setCurrentTile] = useState(0);

    // =========================
    // Top 4 Rows
    // =========================

    const certificateRows: CertificateRow[] = [
        {
            gap: 60,
            images: [
                "/certificates/r 1.png",
                "/certificates/r 2.png"
            ],
        },
        {
            gap: 40,
            images: [
                "/certificates/r1 1.png",
                "/certificates/r1 2.png"
            ],
        },
        {
            gap: 30,
            images: [
                "/certificates/r2 1.png",
                "/certificates/r2 2.png",
                "/certificates/r2 3.png",
            ],
        },
        {
            gap: 35,
            images: ["/certificates/r3 1.png", "/certificates/r3 2.png"],
        },
    ];

    // =========================
    // Bottom Infinite Scroller
    // =========================

    const scroller: CertificateScroller = {
        gap: 80,
        scrollDuration: 80,

        tiles: [
            {
                images: [
                    "/certificates/hs1 (1).png",
                    "/certificates/hs1 (2).png",
                    "/certificates/hs1 (3).png",
                    "/certificates/hs1 (4).png",

                ],
            },

            {
                images: [
                    "/certificates/hs2 (1).png",
                    "/certificates/hs2 (2).png",
                    "/certificates/hs2 (3).png",
                    "/certificates/hs2 (4).png",
                ],
            },

            // {
            //     images: [
            //         "/certificates/hs3 (1).png",
            //         "/certificates/hs3 (2).png",
            //         "/certificates/hs3 (3).png",
            //     ],
            // },

            // {
            //     images: [
            //         "/certificates/hs4 (2).png",
            //         "/certificates/hs4 (3).png",
            //         "/certificates/hs4 (1).png",

            //     ],
            // },
        ],
    };

    // Interval for scrolling last row every 1 second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTile((prev) => (prev + 1) % scroller.tiles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [scroller.tiles.length]);

    return (
        <main className="mx-auto flex max-w-5xl flex-col items-center py-20 mt-10 px-4">
            {/* ================================= */}
            {/* HEADER SECTION */}
            {/* ================================= */}
            <FadeInOnLoad className="w-full flex items-center gap-6 pb-6 border-b border-gray-200/80 mb-16">
                {/* <PrimaryLogo width={70} height={46} className="shrink-0" /> */}
                <div className="flex flex-col gap-2">
                    <h1 className={`${FONTS.microgrammaBold.className} text-[#074139] text-l tracking-wide`}>
                        Obrive Industries — Certificates
                    </h1>
                    <div className={`${FONTS.microgrammaBold.className} flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-500 font-semibold`}>
                        <div className="flex items-center gap-2">
                            <CircleUser className="h-4 w-4" />
                            <span>Obrive Industries Private Limited</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>February 28, 2025</span>
                        </div>
                    </div>
                </div>
            </FadeInOnLoad>

            {/* ================================= */}
            {/* CERTIFICATES ROWS */}
            {/* ================================= */}
            <StaggerOnView className="flex w-full flex-col items-center">
                {certificateRows.map((row, rowIndex) => {
                    const isRow3 = rowIndex === 2;
                    return (
                        <div
                            key={rowIndex}
                            className={`mb-6 flex justify-center items-center ${isRow3 ? "rounded-xl p-4 md:p-6 bg-blue-50/5" : ""
                                }`}
                            style={{
                                gap: `${row.gap}px`,
                            }}
                        >
                            {row.images.map((image, index) => {
                                const isRow1 = rowIndex === 0;
                                return (
                                    <StaggerItem key={index}>
                                        <div
                                            className={`relative shrink-0 transition-transform duration-300 hover:scale-108 cursor-pointer ${isRow1
                                                ? "h-18 w-18 md:h-26 md:w-26"
                                                : "h-15 w-15 md:h-20 md:w-20"
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt=""
                                                fill
                                                className="object-contain"
                                                priority={isRow1}
                                            />
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </div>
                    );
                })}
            </StaggerOnView>

            {/* ================================= */}
            {/* SLIDER SECTION (LAST ROW) */}
            {/* ================================= */}
            <FadeInOnView className="w-full max-w-[360px] md:max-w-[420px] overflow-hidden mx-auto mt-4" delay={0.2}>
                <h1 className={`${FONTS.microgrammaBold.className} text-[#074139] text-l tracking-wide text-center `}>ISO Certifications</h1>
                <div
                    className="flex w-full"
                    style={{
                        transform: `translateX(-${currentTile * 100}%)`,
                        transition: `transform ${scroller.scrollDuration / 100}s ease-in-out`,
                    }}
                >

                    {scroller.tiles.map((tile, tileIndex) => (
                        <div
                            key={tileIndex}
                            className="w-full shrink-0 flex justify-center"
                        >
                            <div className="flex rounded-xl bg-white p-5">
                                <div className="flex gap-4">
                                    {tile.images.map((image, imageIndex) => (
                                        <div
                                            key={imageIndex}
                                            className="relative h-18 w-18 md:h-22 md:w-22 shrink-0 transition-transform duration-300 hover:scale-108 cursor-pointer"
                                        >
                                            <Image
                                                src={image}
                                                alt=""
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
            </FadeInOnView>
        </main>
    );
}
