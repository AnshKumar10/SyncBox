import React from "react";
import { Models } from "node-appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="flex items-center space-x-4 p-4">
    <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100">
      <Thumbnail
        type={file.type}
        extension={file.extension}
        url={file.url}
        imageClassName="h-16 w-16"
      />
    </div>
    <div className="space-y-1">
      <span className="block font-medium">{file.name}</span>
      <span className="block text-sm text-gray-500">
        <FormattedDateTime date={file.$createdAt} />
      </span>
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <Card className="w-full">
      <ImageThumbnail file={file} />
      <CardContent className="gap-4">
        <DetailRow label="Format" value={file.extension} />
        <DetailRow label="Size" value={convertFileSize(file.size)} />
        <DetailRow label="Owner" value={file.owner.fullName} />
        <DetailRow label="Last edit" value={formatDateTime(file.$updatedAt)} />
      </CardContent>
    </Card>
  );
};

interface ShareInputProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({
  file,
  onInputChange,
  onRemove,
}: ShareInputProps) => {
  return (
    <Card className="w-full">
      <ImageThumbnail file={file} />
      <CardContent className="space-y-4">
        <div>
          <span className="block text-sm font-medium mb-2">
            Share file with other users
          </span>
          <Input
            type="email"
            placeholder="Enter email address"
            onChange={(e) => onInputChange(e.target.value.trim().split(","))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Shared with</span>
            <span className="text-sm text-gray-500">
              {file.users.length} users
            </span>
          </div>

          <ul className="space-y-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between rounded-md bg-gray-50 p-2"
              >
                <span className="text-sm">{email}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(email)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove user</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileDetails;
