import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const FileCard = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
            />
            <p className="text-sm text-gray-500">
              {convertFileSize(file.size)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base font-medium line-clamp-1">{file.name}</p>
          <div className="flex items-center space-x-2 mt-2">
            <FormattedDateTime
              date={file.$createdAt}
              className="text-sm text-gray-500"
            />
            <span className="text-sm text-gray-500">
              by {file.owner.fullName}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FileCard;
