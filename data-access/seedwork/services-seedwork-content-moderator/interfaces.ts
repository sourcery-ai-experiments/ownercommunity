
export enum ModeratedContentType {
  PlainText = "text/plain",
  HTML = "text/html",
  Markdown = "text/markdown",
  XML = "text/xml"
}

export interface BatchModerationResult {
  batchApproved: boolean;
  failedKey: string;
}

export interface ModerationResult {
  IsApproved: boolean;
}
