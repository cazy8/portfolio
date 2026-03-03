"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import LinuxResumeView from "@/components/LinuxResumeView";
import NormalResumeView from "@/components/NormalResumeView";
import ViewTransition from "@/components/ViewTransition";

function ResumeContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "linux";
  const [showTransition, setShowTransition] = useState(false);
  const [displayView, setDisplayView] = useState(view);
  const prevViewRef = useRef(view);

  useEffect(() => {
    if (view !== prevViewRef.current) {
      prevViewRef.current = view;
      setShowTransition(true);

      const timer = setTimeout(() => {
        setDisplayView(view);
        setShowTransition(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [view]);

  if (showTransition) {
    return <ViewTransition targetView={view} />;
  }

  if (displayView === "normal") {
    return <NormalResumeView />;
  }

  return <LinuxResumeView />;
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
          <div className="font-mono text-green-400 text-sm animate-pulse">
            Loading resume...
          </div>
        </div>
      }
    >
      <ResumeContent />
    </Suspense>
  );
}
