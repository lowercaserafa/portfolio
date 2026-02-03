"use client";

import { useEffect, useRef, useState } from "react";
import { BlurGradientBg } from "@/jsm/BlurGradientBg.module.js";
import { motion } from "framer-motion";
import * as anime from "animejs";


export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [darkness, setDarkness] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    setHeroHeight(window.innerHeight * 0.7);

    const colorbg = new BlurGradientBg({
      dom: "box",
      colors: ["#212832", "#3F4659", "#8592A7", "#17181c"],
      loop: true,
    });

    let mouseX = 0,
        mouseY = 0,
        currentX = 0,
        currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      currentX += mouseX - currentX;
      currentY += mouseY - currentY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      requestAnimationFrame(animateCursor);
    };

    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const progress = window.scrollY / maxScroll;
      const eased = Math.pow(progress, 2);
      setDarkness(Math.min(Math.max(eased, 0), 1));
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    animateCursor();
    handleScroll();

    setTimeout(() => setLoaded(true), 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (colorbg.destroy) colorbg.destroy();
    };
  }, []);

  const leftPosition = 32;
  const shrinkThreshold = heroHeight || 0;
  const rawProgress =
    scrollY > shrinkThreshold ? Math.min((scrollY - shrinkThreshold) / 600, 1) : 0;
  const easedProgress = Math.pow(rawProgress, 0.5);

  const scale = 1 - 0.45 * easedProgress;
  const fontSize = 130 - 60 * easedProgress;
  const letterSpacing = -0.08 + 0.03 * easedProgress;
  const topPosition = 20 * easedProgress;

  return (
    <>
      <div id="box" className="fixed inset-0 w-full h-full z-[-2]" />
      <div
        className="fixed inset-0 bg-black z-[-1] pointer-events-none"
        style={{ opacity: darkness * 0.8, transition: "opacity 200ms ease-out" }}
      />

      <main
        className={`relative transition-opacity duration-1000 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <motion.a
          href="mailto:youremail@example.com"
          className="fixed top-6 right-6 px-6 py-2 bg-white text-black rounded-full font-medium tracking-[-0.03em] z-50 cursor-none"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          Reach Out
        </motion.a>

        <section className="relative h-screen">
          {scrollY <= shrinkThreshold && (
            <div
              className="text-white font-semibold flex items-center"
              style={{
                position: "absolute",
                bottom: "32px",
                left: "32px",
                fontSize: "130px",
                letterSpacing: "-0.08em",
              }}
            >
              Rafael <span className="font-normal ml-2">Fonte</span>
            </div>
          )}
          
          {/* TITLE MASK: This only masks the fixed title as it reaches the top */}
          {scrollY > shrinkThreshold && (
            <div
              className="text-white font-semibold flex items-center"
              style={{
                position: "fixed",
                top: `${topPosition}px`,
                left: `${leftPosition}px`,
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}em`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                zIndex: 50,
                // MASK APPLIED ONLY HERE: Hide top 20px of the title
                WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, black 40px)`,
                maskImage: `linear-gradient(to bottom, transparent 0px, black 40px)`,
              }}
            >
              Rafael <span className="font-normal ml-2">Fonte</span>
            </div>
          )}
        </section>

        {/* --- CONTENT CONTAINER: NO MASK HERE --- */}
        <div className="relative z-10">
          {/* Intro Section */}
          <section className="min-h-screen flex items-center justify-center px-8 gap-12">
            <motion.div
              className="text-left text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="opacity-85 text-[clamp(1rem,4vw,34px)] tracking-[-0.05em] mb-4">
                Who am I?
              </h2>
              <p className="max-w-lg opacity-80 leading-relaxed mb-4 text-base md:text-lg">
                I create interfaces that people want to use, not just look at. My frontend skills help
                me turn design into reality, so nothing breaks along the way. At 21, living in Porto,
                Portugal, I’m on a mission to make every interaction feel thoughtful and human.
              </p>
              <div className="w-32 mt-4">
                <img src="/assets/signature.svg" alt="Rafael Fonte Signature" className="w-full h-auto" />
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/assets/rafa.png"
                alt="Rafael Fonte"
                className="w-64 h-64 object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
              />
            </motion.div>
          </section>

          {/* Selected Work */}
          <section className="min-h-screen flex flex-col justify-center px-8 md:px-24">
            <motion.h2
              className="text-white opacity-85 text-[clamp(1rem,4vw,34px)] tracking-[-0.05em] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Selected work
            </motion.h2>

            <div className="flex gap-10 overflow-x-auto overflow-y-visible pt-16 pb-20 scrollbar-hide">
              {[
                "/assets/work1.png",
                "/assets/work2.png",
                "/assets/work3.png",
                "/assets/work4.png",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  className="relative min-w-[340px] md:min-w-[560px] lg:min-w-[680px] aspect-[16/9] rounded-2xl bg-black/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <img
                      src={src}
                      alt={`Project ${i + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tools Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center">
            <p className="whitespace-nowrap text-white opacity-85 text-[clamp(1rem,4vw,34px)] tracking-[-0.05em]">
              Tools of the trade
            </p>
            <div className="mt-6 flex justify-center space-x-6">
              {["ai-2.png", "bsq.png", "fgm.png", "ps.png"].map((icon, i) => (
                <img
                  key={i}
                  src={`/assets/${icon}`}
                  alt={`icon${i + 1}`}
                  className="w-25 h-25 transition-transform duration-300 ease-out hover:scale-125"
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-50"
        style={{
          mixBlendMode: "difference",
          transition: "transform 0.15s ease",
        }}
      />
    </>
  );
}