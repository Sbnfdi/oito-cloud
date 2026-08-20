"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsapConfig";
import { ScrollTrigger } from "@/lib/gsapConfig";

export default function EntranceChoreography() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
    });

    // 1. Wordmark rises from masked translateY
    tl.fromTo(
      "[data-hero-text]",
      { y: "118%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.15 },
      0
    );

    // 2. Subtitle fades in
    tl.fromTo(
      "[data-hero-subtitle]",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.4
    );

    // 3. 3D Canvas fades & scales in
    tl.fromTo(
      "#hero-canvas",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
      0.66
    );

    // 4. Nav items stagger in
    tl.fromTo(
      "[data-nav-item]",
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, stagger: 0.045, duration: 0.5 },
      0.9
    );

    // 5. CTA buttons
    tl.fromTo(
      "[data-hero-cta]",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
      1.0
    );

    // 6. Scroll indicator
    tl.fromTo(
      "[data-scroll-indicator]",
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      1.4
    );

    // ─── Scroll Trigger: Morph 3D ──────────────────────────────
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

    // ─── Scroll Trigger: Feature sections reveal ───────────────
    gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return <div ref={containerRef} className="contents" />;
}
