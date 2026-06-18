"use client";

import { motion } from "framer-motion";

export default function RoomEndsPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#090a0f] text-white">

      {/* Background Radial Outer Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-radial from-[#c3ead3]/10 via-black to-black"
      />

      {/* Animated Center Glow */}
      <motion.div
        animate={{
          scale: [3, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 5,
          // repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(circle_at_center,_rgba(7,65,57,0.9)_20%,_rgba(9,10,15,0)_75%)]"
      />

      {/* Optional Expanding Ring */}
      <motion.div
        animate={{
          scale: [0.8, 1.4],
          opacity: [0.15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute w-[300px] h-[300px] rounded-full border border-emerald-300/10"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-[520px] px-4"
      >

        <div
          className="rounded-3xl border border-white/5 
          bg-[#13141c]/90 backdrop-blur-xl
          px-6 py-6 shadow-2xl"
        >

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center text-3xl font-medium tracking-tight text-gray-100"
          >
            The room has ended
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 4 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mt-4 h-[1px] w-24 bg-emerald-200/20 origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 text-center text-sm font-medium leading-relaxed text-slate-500"
          >
            Thank you for being part of the conversation.
          </motion.p>

        </div>
      </motion.div>
    </div>
  );
}