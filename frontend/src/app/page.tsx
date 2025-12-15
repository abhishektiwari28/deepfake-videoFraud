"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import ReportViewer from "@/components/ReportViewer";
import { ForensicReport } from "@/types/forensics";
import { Activity, Shield } from "lucide-react";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<ForensicReport | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setReport(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("claim_id", `CLM-${new Date().toISOString().slice(0, 10)}-AUTO`);

    try {
      // Assuming backend is at localhost:8000
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      // Artificial delay for dramatic effect / "processing" feel
      setTimeout(() => {
        setReport(data);
        setIsUploading(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsUploading(false);
      alert("Error analyzing video. Ensure backend is running.");
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[url('/bg-noise.png')]">
      {/* Background Gradients */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="fixed -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-white">
              SENTRY <span className="text-slate-500 font-normal">| Deepfake Forensics</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              SYSTEM ONLINE
            </div>
            <span>v2.4.0-RC1</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-10 max-w-5xl">
        {!report ? (
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                Secure Evidence Analysis
              </h2>
              <p className="text-lg text-slate-400">
                Upload video evidence for AI-driven manipulation detection,
                PRNU signature matching, and metadata forensics.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <UploadZone onFileSelect={handleFileSelect} isUploading={isUploading} />
            </div>

            {isUploading && (
              <div className="max-w-xl mx-auto text-center space-y-4 animate-pulse">
                <Activity className="w-8 h-8 text-blue-500 mx-auto animate-spin" />
                <p className="text-slate-400 font-mono text-sm">INITIALIZING NEURAL NETWORKS...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setReport(null)}
              className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2"
            >
              ← Upload New Evidence
            </button>
            <ReportViewer report={report} />
          </div>
        )}
      </div>
    </main>
  );
}
