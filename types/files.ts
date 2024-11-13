export type FileType = "document" | "image" | "video" | "audio" | "other";

export interface UploadFilePropsInterface {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}

export interface GetFilesPropsInterface {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}
