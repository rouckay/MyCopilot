import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { resetGlobalAudio, speak } from "../utils";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import React from "react";

const Meteors = ({ number, className }: { number?: number; className?: string }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className,
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};

interface PreviewSlideProps {
  title?: string;
  content?: string;
  spokenNarration?: string;
  done?: boolean;
}

export function PreviewSlide({ title, content, spokenNarration, done }: PreviewSlideProps) {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">{title}</h1>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50 whitespace-pre">
            {content}
          </p>
          {spokenNarration && (
            <p className="font-normal text-sm text-slate-500 mb-4 relative z-50">
              "{spokenNarration}"
            </p>
          )}
          {done && (
            <button
              className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
              onClick={() => {
                resetGlobalAudio();
                speak(spokenNarration!);
              }}
            >
              Speak
            </button>
          )}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
