"use client";

import { ForensicReport, KeyFinding, Verdict } from "@/types/forensics";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, HelpCircle, ShieldAlert, ShieldCheck } from "lucide-react";

interface ReportViewerProps {
    report: ForensicReport;
}

export default function ReportViewer({ report }: ReportViewerProps) {
    const isManipulated = report.verdict === "manipulated";
    const isAuthentic = report.verdict === "authentic";
    const isInconclusive = report.verdict === "inconclusive";

    const verdictColor = isManipulated
        ? "text-red-500"
        : isAuthentic
            ? "text-green-500"
            : "text-amber-500";

    const verdictBg = isManipulated
        ? "bg-red-500/10 border-red-500/20"
        : isAuthentic
            ? "bg-green-500/10 border-green-500/20"
            : "bg-amber-500/10 border-amber-500/20";

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Verdict Header */}
            <div className={cn("rounded-2xl border p-8 flex flex-col md:flex-row items-center justify-between gap-6", verdictBg)}>
                <div className="flex items-center gap-6">
                    <div className={cn("p-4 rounded-full border-2",
                        isManipulated ? "border-red-500 bg-red-500/20" :
                            isAuthentic ? "border-green-500 bg-green-500/20" :
                                "border-amber-500 bg-amber-500/20")}>
                        {isManipulated && <ShieldAlert className="w-12 h-12 text-red-500" />}
                        {isAuthentic && <ShieldCheck className="w-12 h-12 text-green-500" />}
                        {isInconclusive && <HelpCircle className="w-12 h-12 text-amber-500" />}
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Analysis Verdict</h2>
                        <div className={cn("text-4xl font-bold tracking-tight capitalize mt-1", verdictColor)}>
                            {report.verdict}
                        </div>
                        <p className="text-slate-400 mt-2 text-sm">
                            Confidence Score: <span className="font-mono text-white">{(report.confidence * 100).toFixed(1)}%</span>
                        </p>
                    </div>
                </div>

                <div className="text-right hidden md:block">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Claim ID</div>
                    <div className="font-mono text-xl text-slate-200">{report.claim_id}</div>
                </div>
            </div>

            {/* Key Findings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.key_findings.map((finding, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-xl space-y-3 hover:bg-slate-800/80 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                                {finding.category}
                            </span>
                            {finding.evidence_strength === "high" && (
                                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" title="High Evidence Strength" />
                            )}
                        </div>

                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                            {finding.signal}
                        </p>

                        <div className={cn("text-xs flex items-center gap-2",
                            finding.direction === "indicates_manipulation" ? "text-red-400" :
                                finding.direction === "supports_authenticity" ? "text-green-400" :
                                    "text-slate-400"
                        )}>
                            {finding.direction === "indicates_manipulation" ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            <span className="capitalize">{finding.direction.replace('_', ' ')}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Limitations & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Analysis Limitations</h3>
                    <ul className="space-y-2">
                        {report.limitations.map((lim, i) => (
                            <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                                <span className="text-slate-700 mt-1">•</span>
                                {lim}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Recommended Actions</h3>
                    <ul className="space-y-2">
                        {report.recommended_followups.map((rec, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">→</span>
                                {rec}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
