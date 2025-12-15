from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class Verdict(str, Enum):
    AUTHENTIC = "authentic"
    MANIPULATED = "manipulated"
    INCONCLUSIVE = "inconclusive"

class Direction(str, Enum):
    SUPPORTS_AUTHENTICITY = "supports_authenticity"
    INDICATES_MANIPULATION = "indicates_manipulation"
    NEUTRAL = "neutral"

class EvidenceStrength(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class KeyFinding(BaseModel):
    category: str
    signal: str
    direction: Direction
    evidence_strength: EvidenceStrength

class ForensicReport(BaseModel):
    claim_id: str
    verdict: Verdict
    confidence: float
    key_findings: List[KeyFinding]
    limitations: List[str]
    recommended_followups: List[str]
    reproducibility_notes: List[str]
