import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Card } from "@/components/ui/card";
import ActionDropdown from "./ActionDropdown";
import { FileIcon, Clock, User } from "lucide-react";

const FileCard = ({ file }: { file: Models.Document }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 transform hover:scale-105 hover:shadow-lg rounded-lg border border-gray-200">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-50 rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            imageClassName="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <FileIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              {convertFileSize(file.size)}
            </span>
          </div>
          <ActionDropdown file={file} />
        </div>
      </div>

      <Link href={file.url} target="_blank" className="block p-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {file.name}
            </h3>
            <p className="text-sm text-gray-600">
              {file.type} • {file.extension.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gray-400" />
              <FormattedDateTime date={file.$createdAt} className="text-xs" />
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-xs">{file.owner.fullName}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default FileCard;
