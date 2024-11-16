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

export interface RenameFilePropsInterface {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

export interface UpdateFileUsersPropsInterface {
  fileId: string;
  emails: string[];
  path: string;
}

export interface DeleteFilePropsInterface {
  fileId: string;
  bucketFileId: string;
  path: string;
}

interface StorageFileTypeInterface {
  size: number; // The size in bytes
  latestDate: string;
}

export interface StorageInfoInterface {
  image: StorageFileTypeInterface;
  document: StorageFileTypeInterface;
  video: StorageFileTypeInterface;
  audio: StorageFileTypeInterface;
  other: StorageFileTypeInterface;
  used: number;
  all: number;
}
