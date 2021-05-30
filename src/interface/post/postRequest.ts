export interface UploadPostRequest {
  title: string;
  content: string;
}

export interface PatchPostRequest {
  title?: string;
  content?: string;
}