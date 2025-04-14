export interface Summary {
  summary: string[];
  timestampedSummary: string[];
  transcript: string[];
  comments: string[];
}

export interface TabConfig {
  icon: string;
  tooltip: string;
}

export interface ExportOption {
  icon: string;
  text: string;
  format: string;
}
