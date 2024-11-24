import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Image,
  FileText,
  Video,
  Music,
  Archive,
  Code,
  File,
  FileCode,
  FileType,
  Clapperboard,
  LucideIcon,
} from "lucide-react";
import { appwriteConfig } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringfy = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const formatDateTime = (
  isoString?: string | null | undefined
): string => {
  if (!isoString) return "-";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "-"; // Handle invalid date strings

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format time
  const time = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;

  // Format date
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Example: "Jan", "Feb"
  const year = date.getFullYear();

  return `${time}, ${day} ${month} ${year}`;
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (
  sizeInBytes: number,
  digits: number = 1
): string => {
  const KB = 1024; // Define constants for unit thresholds
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (sizeInBytes < KB) {
    return `${sizeInBytes} B`; // Bytes
  } else if (sizeInBytes < MB) {
    return `${(sizeInBytes / KB).toFixed(digits)} KB`; // Kilobytes
  } else if (sizeInBytes < GB) {
    return `${(sizeInBytes / MB).toFixed(digits)} MB`; // Megabytes
  } else {
    return `${(sizeInBytes / GB).toFixed(digits)} GB`; // Gigabytes
  }
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024;
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
  if (!fileName || typeof fileName !== "string")
    throw new Error("Invalid file name");
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (!ext) return { type: "other", ext: "" };

  const fileTypes: { [key: string]: string } = {
    // Images
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    bmp: "image",
    svg: "image",
    webp: "image",

    // Documents
    pdf: "document",
    doc: "document",
    docx: "document",
    xls: "document",
    xlsx: "document",
    ppt: "document",
    pptx: "document",
    txt: "document",
    csv: "document",

    // Videos
    mp4: "video",
    avi: "video",
    mov: "video",
    mkv: "video",
    webm: "video",

    // Audio
    mp3: "audio",
    wav: "audio",
    flac: "audio",
    aac: "audio",
    ogg: "audio",

    // Archives
    zip: "archive",
    rar: "archive",
    tar: "archive",
    gz: "archive",
    "7z": "archive",
  };
  const type = fileTypes[ext] || "other";
  return { type, ext };
};

export const getFileIcon = (
  ext: string | undefined,
  type: string | undefined
): LucideIcon => {
  const typeIconMap: Record<string, any> = {
    image: Image,
    document: FileText,
    video: Video,
    audio: Music,
    archive: Archive,
    code: Code,
    other: File,
  };

  const extIconMap: Record<string, any> = {
    pdf: FileText,
    json: FileCode,
    csv: FileText,
    html: FileCode,
    js: FileCode,
    ts: FileCode,
  };

  // Check if `ext` is valid and exists in the `extIconMap`
  if (ext && extIconMap[ext]) {
    return extIconMap[ext];
  }

  // Fallback to `typeIconMap` based on the type, or `File` as a default
  return type && typeIconMap[type] ? typeIconMap[type] : File;
};

// DASHBOARD UTILS
export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: FileText,
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: Image,
      url: "/images",
    },
    {
      type: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: Clapperboard,
      url: "/media",
    },
    {
      title: "Archives",
      size: totalSpace.archive.size,
      latestDate: totalSpace.archive.latestDate,
      icon: Archive,
      url: "/archives",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: FileType,
      url: "/others",
    },
  ];
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "archives":
      return ["archive"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};

// APPWRITE URL UTILS
export const constructFileUrl = (bucketFileId: string) => {
  return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFileId}/view?project=${appwriteConfig.projectId}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFileId}/download?project=${appwriteConfig.projectId}`;
};
