import random
import os
from app.models import ForensicReport, KeyFinding, Verdict, Direction, EvidenceStrength

# In a real scenario, we would use ffmpeg-python to extract actual metadata
# import ffmpeg

def analyze_video_evidence(file_path: str, claim_id: str) -> ForensicReport:
    """
    Simulates a rigorous forensic analysis pipeline.
    In a real implementation, this would run FFmpeg checks, CNN models, and PRNU analysis.
    Here we simulate varied results based on a random seed or file properties for demo purposes.
    """
    
    # 1. Container & Metadata Forensics
    # Simulating finding inconsistent metadata
    findings = []
    
    # Randomly decide if this video is "sketchy" for the demo
    # We can use file size as a seed for determinism in this demo
    file_size = os.path.getsize(file_path)
    is_suspicious = (file_size % 10) > 6 # 30% chance of being suspicious
    
    # A. Container Analysis
    findings.append(KeyFinding(
        category="metadata",
        signal="Container format ISO/IEC 14496-14 (MP4) consistent with Google Pixel 7 signature.",
        direction=Direction.SUPPORTS_AUTHENTICITY,
        evidence_strength=EvidenceStrength.MEDIUM
    ))

    # B. Frame-Level
    if is_suspicious:
        findings.append(KeyFinding(
            category="visual",
            signal="High-frequency noise anomalies detected in facial region (FaceForensics++ signature).",
            direction=Direction.INDICATES_MANIPULATION,
            evidence_strength=EvidenceStrength.HIGH
        ))
        findings.append(KeyFinding(
            category="visual",
            signal="Temporal jitter in background parallax around subject wireframe.",
            direction=Direction.INDICATES_MANIPULATION,
            evidence_strength=EvidenceStrength.MEDIUM
        ))
    else:
         findings.append(KeyFinding(
            category="visual",
            signal="Sensor pattern noise (PRNU) consistent across frames.",
            direction=Direction.SUPPORTS_AUTHENTICITY,
            evidence_strength=EvidenceStrength.HIGH
        ))

    # C. Audio-Visual
    findings.append(KeyFinding(
        category="audio",
        signal="Lip-sync delay < 40ms (within tolerance).",
        direction=Direction.SUPPORTS_AUTHENTICITY,
        evidence_strength=EvidenceStrength.LOW
    ))

    # Decision Logic
    suspicious_count = sum(1 for f in findings if f.direction == Direction.INDICATES_MANIPULATION)
    
    verdict = Verdict.INCONCLUSIVE
    confidence = 0.5
    
    if suspicious_count >= 2:
        verdict = Verdict.MANIPULATED
        confidence = 0.85 + (random.random() * 0.1)
    elif suspicious_count == 0:
        verdict = Verdict.AUTHENTIC
        confidence = 0.88 + (random.random() * 0.05)
    else:
        verdict = Verdict.INCONCLUSIVE
        confidence = 0.60
        
    return ForensicReport(
        claim_id=claim_id,
        verdict=verdict,
        confidence=round(confidence, 2),
        key_findings=findings,
        limitations=[
            "No separate audio track provided for spectral analysis.",
            "Device reference PRNU not available for absolute confirmation."
        ],
        recommended_followups=[
            "Request raw camera original.",
            "Manual review of frame 154-160 for blending artifacts."
        ],
        reproducibility_notes=[
            "Analysis Engine v1.0.0",
            "Threshold set to Strict (0.8)"
        ]
    )
