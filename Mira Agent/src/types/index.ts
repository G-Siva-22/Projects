export interface CSVRow {
  Task: string;
  Description: string;
  Actions: string;
  Objects: string;
}

export interface SearchResult {
  item: CSVRow;
  score?: number;
  matches?: any[];
  instructions?: string;
}

export interface UploadState {
  isUploading: boolean;
  isUploaded: boolean;
  error: string | null;
  fileName: string | null;
}

export interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}