/* eslint-disable no-unused-vars */

import { LucideIcon } from "lucide-react";

declare type FileType =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "archive"
  | "other";

declare interface ActionType {
  label: string;
  icon: LucideIcon;
  value: string;
}

declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}
declare interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}
declare interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}
declare interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}
declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

declare interface MobileNavigationProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}
declare interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

declare interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  className?: string;
  imageClassName?: string;
}

declare interface ShareInputProps {
  file: Models.Document;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (email: string) => void;
}

declare interface User {
  fullName: string;
  email: string;
  avatar: string;
  accountId: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  files: UploadFile[];
  $databaseId: string;
  $collectionId: string;
}

declare interface UploadFile {
  name: string;
  url: string;
  type: string;
  bucketFileId: string;
  accountId: string;
  extension: string;
  size: number;
  users: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  owner: User[];
  $databaseId: string;
  $collectionId: string;
}
