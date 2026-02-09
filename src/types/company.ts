export interface Company {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
  website: string;
  prefecture: string;
  city: string;
  hasEmail: boolean;
  hasSns: boolean;
  hasTel: boolean;
}

export type ExclusionDecision = 'exclude' | 'keep';

export interface SampleCompany extends Company {
  decision: ExclusionDecision;
  aiReason: string; // AI's reason for suggesting exclusion
}

export type ModalStep =
  | 'closed'
  | 'condition-input'       // Entry 1: text input for exclusion condition
  | 'pattern-confirm'       // Entry 2: confirm AI-detected pattern
  | 'sample-review-1'       // First sample review (10 companies)
  | 'sample-review-2'       // Second sample review after refinement
  | 'final-confirm';        // Final confirmation before exclusion

export interface ExclusionState {
  step: ModalStep;
  condition: string;
  refinedCondition: string;
  feedbackText: string;
  totalMatches: number;
  refinedMatches: number;
  sampleCompanies: SampleCompany[];
  refinedSampleCompanies: SampleCompany[];
  finalExcludeIds: Set<string>;
  entryMode: 'rule' | 'sample';
  selectedCompanyIds: string[];
  detectedPattern: string;
}
