"use client";

import { useState, useRef } from "react";
import { Upload, FileVideo, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
    isUploading: boolean;
}

export default function UploadZone({ onFileSelect, isUploading }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith("video/")) {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            alert("Please upload a video file.");
        }
    };

    return (
        <div
            className={cn(
                "relative group cursor-pointer border-2 border-dashed rounded-xl p-12 transition-all duration-300",
                isDragging
                    ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                    : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50",
                isUploading && "pointer-events-none opacity-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className={cn(
                    "p-4 rounded-full bg-slate-800 transition-transform duration-500",
                    isDragging ? "scale-110" : ""
                )}>
                    {fileName ? (
                        <FileVideo className="w-10 h-10 text-blue-400" />
                    ) : (
                        <Upload className="w-10 h-10 text-slate-400" />
                    )}
                </div>

                <div className="space-y-1">
                    <p className="text-xl font-semibold text-slate-200">
                        {fileName ? fileName : "Upload Evidence Video"}
                    </p>
                    <p className="text-sm text-slate-400">
                        {fileName
                            ? "Ready for analysis"
                            : "Drag & drop or click to browse (MP4, MOV, MKV)"}
                    </p>
                </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-600 rounded-tl-sm group-hover:border-blue-500 transition-colors" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-600 rounded-tr-sm group-hover:border-blue-500 transition-colors" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-600 rounded-bl-sm group-hover:border-blue-500 transition-colors" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-600 rounded-br-sm group-hover:border-blue-500 transition-colors" />
        </div>
    );
}
