"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import DropZone from "./DropZone";
import DeployProgress from "./DeployProgress";
import type { UploadedFile, DeployStatus } from "@/types";

type ModalState = "upload" | "deploying" | "complete" | "error";

export default function DeployModal() {
  const { deployModalOpen, setDeployModalOpen } = useApp();
  const [state, setState] = useState<ModalState>("upload");
  const [deployStep, setDeployStep] = useState(0);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>("pending");
  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | undefined>();

  const handleClose = useCallback(() => {
    setDeployModalOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setState("upload");
      setDeployStep(0);
      setDeployStatus("pending");
      setProjectName("");
      setFiles([]);
      setError(undefined);
    }, 300);
  }, [setDeployModalOpen]);

  const handleDeploy = useCallback(async () => {
    if (!projectName.trim()) return;

    setState("deploying");

    // Simulate deployment steps
    const steps: { step: number; status: DeployStatus; delay: number }[] = [
      { step: 0, status: "syncing", delay: 0 },
      { step: 1, status: "provisioning", delay: 2500 },
      { step: 2, status: "deploying", delay: 2000 },
    ];

    for (const s of steps) {
      await new Promise((resolve) => setTimeout(resolve, s.delay));
      setDeployStep(s.step);
      setDeployStatus(s.status);
    }

    // Complete
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDeployStatus("ready");
    setState("complete");
  }, [projectName]);

  return (
    <AnimatePresence>
      {deployModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-strong rounded-2xl w-full max-w-lg p-8 pointer-events-auto relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <h2 className="text-xl font-semibold text-white mb-1">
                {state === "upload"
                  ? "New Deployment"
                  : state === "deploying"
                  ? "Deploying..."
                  : state === "complete"
                  ? "Deployment Complete"
                  : "Deployment Failed"}
              </h2>
              <p className="text-sm text-white/40 mb-6">
                {state === "upload"
                  ? "Upload your project files to deploy."
                  : state === "deploying"
                  ? "Your project is being deployed."
                  : state === "complete"
                  ? "Your project is now live!"
                  : "Something went wrong."}
              </p>

              {/* Content */}
              <AnimatePresence mode="wait">
                {state === "upload" && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Project name */}
                    <div>
                      <label className="text-xs text-white/40 mb-1.5 block">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="my-awesome-project"
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-400/50 focus:ring-1 focus:ring-brand-400/20 transition-all"
                      />
                    </div>

                    {/* File upload */}
                    <DropZone onFilesSelected={setFiles} />

                    {/* Deploy button */}
                    <button
                      onClick={handleDeploy}
                      disabled={!projectName.trim() || files.length === 0}
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      Deploy Project
                    </button>
                  </motion.div>
                )}

                {(state === "deploying" || state === "complete" || state === "error") && (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <DeployProgress
                      currentStep={deployStep}
                      status={deployStatus}
                      error={error}
                    />

                    {state === "complete" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 space-y-3"
                      >
                        <div className="glass rounded-xl px-4 py-3 flex items-center justify-between">
                          <span className="text-xs text-white/40">Live URL</span>
                          <span className="text-xs text-brand-400 font-mono">
                            https://{projectName}.oitocloud.app
                          </span>
                        </div>
                        <button
                          onClick={handleClose}
                          className="w-full px-4 py-2.5 rounded-xl glass text-white/60 text-sm hover:text-white hover:bg-white/5 transition-all"
                        >
                          Close
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
