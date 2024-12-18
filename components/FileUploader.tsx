"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Thumbnail from "./Thumbnail";
import Image from "next/image";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import { useUser } from "@/provider/UserContext";

interface Props {
  className?: string;
}
const FileUploader = ({ className }: Props) => {
  const { user } = useUser();
  const { toast } = useToast();
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">
                  {file.name} is too large. Max file size is 50MB.
                </span>
              </p>
            ),
            className: "error-toast",
          });
        }
        return uploadFile({
          file,
          ownerId: user?.$id as string,
          accountId: user?.accountId as string,
          path,
        }).then((uploadedFile) => {
          if (uploadedFile) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name)
            );
          }
        });
      });
      await Promise.all(uploadPromises);
    },
    [user?.$id, user?.accountId, path]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleRemoveFile = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Upload aria-label="Upload" width={24} height={24} />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading...</h4>
          {files.map((file, i) => {
            const { type, ext } = getFileType(file.name);
            return (
              <li key={`${file.name}-${i}`} className="uploader-preview-item">
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    ext={ext}
                    url={convertFileToUrl(file)}
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src={"/file-loader.gif"}
                      alt="Loader"
                      width={80}
                      height={26}
                      className="h-auto w-auto"
                      unoptimized
                    />
                  </div>
                </div>
                <X
                  width={24}
                  height={24}
                  aria-label="Close"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
