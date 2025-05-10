"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
        transform: "translateY(0px)",
      },
      {
        duration: duration,
        delay: stagger(0.08),
        easing: "ease-in-out",
      }
    );
  }, [scope, animate, filter, duration]);

  return (
    <div className={cn("font-medium", className)}>
      <motion.div ref={scope} className="flex flex-wrap">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0"
            style={{
              filter: filter ? "blur(8px)" : "none",
              transform: "translateY(20px)",
              marginRight: "0.4rem",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
