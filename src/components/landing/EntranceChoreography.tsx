"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsapConfig";
import { ScrollTrigger } from "@/lib/gsapConfig";

export default function EntranceChoreography() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll Trigger: Morph 3D
    ScrollTrigger.create({
      trigger: "#scroll-morph-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        window.dispatchEvent(
          new CustomEvent("morph-progress", { detail: progress })
        );
      },
    });

    // Scroll Trigger: Feature sections reveal
    gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return <div ref={containerRef} className="contents" />;
}
