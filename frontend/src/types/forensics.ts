export type Verdict = "authentic" | "manipulated" | "inconclusive";
export type Direction = "supports_authenticity" | "indicates_manipulation" | "neutral";
export type EvidenceStrength = "low" | "medium" | "high";

export interface KeyFinding {
    category: string;
    signal: string;
    direction: Direction;
    evidence_strength: EvidenceStrength;
}

export interface ForensicReport {
    claim_id: string;
    verdict: Verdict;
    confidence: number;
    key_findings: KeyFinding[];
    limitations: string[];
    recommended_followups: string[];
    reproducibility_notes: string[];
}
