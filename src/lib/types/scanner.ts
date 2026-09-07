export interface ExtractedFieldItem<T = any> {
  value: T | null;
  confidence: number;
  status: 'VERIFIED' | 'INFERRED' | 'NEEDS_CONFIRMATION' | 'NOT_FOUND' | 'CONFLICTING' | string;
  sourceDocument: string;
  sourcePage?: number | null;
  rawSnippet?: string | null;
  needsConfirmation: boolean;
  conflictingValues?: Array<{
    value: any;
    sourceDocument: string;
    sourcePage?: number | null;
  }>;
}

export interface PetProfile {
  species: string;
  name?: string | null;
  breed?: string | null;
  microchipNumber?: string | null;
  microchipDate?: string | null;
  rabiesVaccinationDate?: string | null;
  rabiesVaccinationType?: string | null;
  dhppVaccinationDate?: string | null;
}

export interface BlockerSummary {
  criticalBlockersCount: number;
  requiredActionsCount: number;
  travelDayActionsCount: number;
  completedVerifiedCount: number;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  status: 'COMPLETED' | 'PENDING' | 'GOAL' | string;
  description: string;
  isPrerequisite?: boolean;
}

export interface ScannerStats {
  documentsDetectedCount: number;
  overallStatus: 'NOT_READY' | 'ACTION_REQUIRED' | 'READY_TO_FLY' | string;
  statusHeadline: string;
  needsHumanReview?: boolean;
  earliestFlightDate: string;
  earliestFlightDateTitle?: string;
  earliestFlightDateSubtitle?: string;
  disclaimer?: string;
  blockerSummary: BlockerSummary;
  confidenceLevel: string;
}

export interface ComplianceItem {
  ruleId: string;
  name: string;
  category: 'MEDICAL' | 'DOCUMENTS' | 'TRANSIT' | 'LOGISTICS' | string;
  scope: 'LEAVING' | 'TRANSIT' | 'ARRIVING' | 'LOGISTICS' | string;
  jurisdiction?: string;
  status: 'CRITICAL_BLOCKER' | 'REQUIRED_ACTION' | 'SATISFIED' | 'TRAVEL_DAY_ACTION' | string;
  severity: string;
  statusBadge: string;
  whatToDo: string;
  details: string;
  authority: string;
  sourceTitle?: string;
  ruleVersion?: string;
  effectiveFrom?: string;
  verifiedAt?: string;
  deadlines: string;
  sourceUrl: string;
  matchedEvidence?: {
    value: any;
    confidence: number;
    status: string;
    sourceDocument: string;
    needsConfirmation?: boolean;
    conflictingValues?: any[];
  };
}

export interface DocumentAuditItem {
  filename: string;
  detected_type: string;
  status: string;
  summary: string;
}

export interface WhereThingsStandItem {
  requirement: string;
  category: string;
  scope: string;
  statusBadge: string;
  status: string;
  severity: string;
  whatToDo: string;
  details: string;
}

export interface ReadinessReport {
  whatThisMeans: string;
  whereThingsStand: WhereThingsStandItem[];
  documentAudit: DocumentAuditItem[];
  nextSteps: string[];
  travelDayPrep: string[];
}

export interface ScanResult {
  status: string;
  route: {
    origin: string;
    destination: string;
    transitCountries?: string[];
    departureDate?: string | null;
  };
  petDetected: boolean;
  petProfile: PetProfile;
  factsWithConfidence?: Record<string, ExtractedFieldItem>;
  stats: ScannerStats;
  timelineMilestones: TimelineMilestone[];
  complianceChecklist: {
    all: ComplianceItem[];
    leaving: ComplianceItem[];
    transit: ComplianceItem[];
    arriving: ComplianceItem[];
    logistics: ComplianceItem[];
  };
  readinessReport: ReadinessReport;
}
