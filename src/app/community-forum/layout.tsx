import { Michroma } from "next/font/google";
import type { ReactNode } from "react";

// import localFont from "next/font/local";

// const microgrammaBold = localFont({
//   src: "./local/microgramma-bold.otf",
//   display: "swap",
//   weight: "800",
//   variable: "--font-microgramma-bold",
// });

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

interface CommunityLayoutProps {
  children: ReactNode;
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <section className={`${michroma.className}  min-h-screen `}>
      {children}
    </section>
  );
}
