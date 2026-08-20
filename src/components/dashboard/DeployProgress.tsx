"use client";

import { motion } from "framer-motion";
import type { DeployStatus } from "@/types";
import { DEPLOY_STEPS } from "@/lib/constants";

interface DeployProgressProps {
  currentStep: number; // 0, 1, or 2
  status: DeployStatus;
  error?: string;
}

export default function DeployProgress({
  currentStep,
  status,
  error,
}: DeployProgressProps) {
  return (
    <div className="space-y-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {DEPLOY_STEPS.map((step, i) => {
          const isComplete = i < currentStep;
          const isActive = i === currentStep && status !== "error";
          const isFailed = i === currentStep && status === "error";

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    isComplete
                      ? "bg-emerald-500/20 border-emerald-500"
                      : isActive
                      ? "bg-brand-500/20 border-brand-400"
                      : isFailed
                      ? "bg-red-500/20 border-red-500"
                      : "bg-white/5 border-white/10"
                  }`}
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(6, 182, 212, 0.2)",
                            "0 0 0 8px rgba(6, 182, 212, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    isActive
                      ? { duration: 1.5, repeat: Infinity, ease: "easeOut" }
                      : {}
                  }
                >
                  {isComplete ? (
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : isFailed ? (
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ) : isActive ? (
                    <motion.div
                      className="w-4 h-4 rounded-full bg-brand-400"
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ) : (
                    <span className="text-xs text-white/30 font-mono">
                      {i + 1}
                    </span>
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={`mt-3 text-xs font-medium text-center whitespace-nowrap ${
                    isComplete
                      ? "text-emerald-400"
                      : isActive
                      ? "text-brand-400"
                      : isFailed
                      ? "text-red-400"
                      : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {i < DEPLOY_STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 mb-6 rounded-full overflow-hidden bg-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: isComplete ? "100%" : isActive ? "50%" : "0%",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      background: isComplete
                        ? "#10b981"
                        : "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current step description */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {status === "error" && error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : status === "ready" ? (
          <div className="space-y-2">
            <p className="text-sm text-emerald-400 font-medium">
              ✓ Deployment successful!
            </p>
            <p className="text-xs text-white/40">
              Your project is now live and accessible.
            </p>
          </div>
        ) : (
          <p className="text-sm text-white/40">
            {DEPLOY_STEPS[currentStep]?.description || "Processing..."}
          </p>
        )}
      </motion.div>

      {/* Progress bar */}
      {status !== "error" && status !== "ready" && (
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep + 0.5) / DEPLOY_STEPS.length) * 100}%`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}
