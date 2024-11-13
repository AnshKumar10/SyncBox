"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileTypeAndExtension } from "@/lib/utils";
import { Upload, CircleX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { uploadFile } from "@/lib/actions/file.actions";
import Thumbnail from "@/components/Thumbnail";
import Image from "next/image";

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: FileUploaderProps) => {
  const path = usePathname();
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((prevFile) => prevFile.name !== file.name)
          );

          return toast({
            variant: "destructive",
            duration: 3000,
            description: (
              <p>
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((prevFile) => prevFile.name !== file.name)
              );
              toast({
                description: `${file.name} uploaded successfully!`,
                duration: 3000,
              });
            }
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ownerId, accountId, path]
  );

  const handleRemoveFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string
  ) => {
    event.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        <Button type="button" className={cn("uploader-button", className)}>
          <Upload width={24} height={24} />
          <p>Upload</p>
        </Button>
      </div>
      <div className="fixed bottom-4 right-4 w-full max-w-lg z-50">
        {files.length > 0 && (
          <div className="mt-4 space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Uploading {files.length} file{files.length > 1 ? "s" : ""}
            </h4>

            <ul className="space-y-3">
              {files.map((file, index) => {
                const { type, extension } = getFileTypeAndExtension(file.name);
                return (
                  <li
                    key={`${file.name}-${index}`}
                    className={cn(
                      "p-4 rounded-lg",
                      "bg-white dark:bg-gray-800",
                      "border border-gray-200 dark:border-gray-700",
                      "flex items-center justify-between",
                      "animate-fadeIn"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <Thumbnail
                        type={type}
                        extension={extension}
                        url={convertFileToUrl(file)}
                      />
                      <div className="flex flex-col items-start gap-2">
                        <div className="preview-item-name">{file.name}</div>
                        <Image
                          src="/assets/icons/file-loader.gif"
                          width={80}
                          height={26}
                          alt="Loader"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(event) => handleRemoveFile(event, file.name)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <CircleX className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
