import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension?: string;
  url?: string;
  imageClassName?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <Image
      src={isImage && url ? url : getFileIcon(extension, type)}
      alt="thumbnail"
      width={100}
      height={100}
      className={cn("size-8 object-cover", imageClassName)}
    />
  );
};
export default Thumbnail;
