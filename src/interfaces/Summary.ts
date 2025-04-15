export interface Summary {
  summary: string[];
  timestampedSummary: TimestampedItem[];
  transcript: TranscriptItem[];
  comments: CommentItem[];
}

export interface TimestampedItem {
  time: number;
  seconds: number;
  text: string;
}

export interface TranscriptItem {
  start: number;
  duration: number;
  text: string;
}

export interface CommentItem {
  author: string;
  text: string;
  likes: number;
  timestamp?: string;
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
