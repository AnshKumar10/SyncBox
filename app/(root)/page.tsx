import Link from "next/link";
import { Models } from "node-appwrite";
import { FileIcon, HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import ActionDropdown from "@/components/ActionDropdown";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const totalStorage = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="container mx-auto p-6 space-y-8 lg:space-y-10">
      {/* Storage Details Card */}
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-3xl overflow-hidden">
        <CardContent className="px-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-3">
                <HardDrive className="w-6 h-6 text-blue-600" />
                Storage Details
              </CardTitle>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-2 w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Used Space</span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {totalSpace.used ? convertFileSize(totalSpace.used) : "0MB"}
                </p>
              </div>
              <div className="w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {convertFileSize(totalStorage - totalSpace.used)}
                </p>
              </div>
            </div>

            {/* Storage Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full mt-4">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{
                  width: `${(totalSpace.used / totalStorage) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>Total Storage: 2GB</span>
              <span>
                {totalSpace.used ? convertFileSize(totalSpace.used) : "0MB"}{" "}
                used
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Types Summary Card */}
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-3xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">File Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {usageSummary.map((summary) => (
              <Link
                href={summary.url}
                key={summary.title}
                className="group rounded-lg p-4 transition-all hover:bg-blue-100 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <Thumbnail type={summary.icon} />
                  <span className="text-lg font-medium text-gray-800">
                    {convertFileSize(summary.size) || "0"}
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{summary.title}</h4>
                <Separator className="my-2" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-sm text-muted-foreground"
                />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Files Card */}
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-3xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">Recent Files</CardTitle>
        </CardHeader>
        <CardContent>
          {files.documents.length > 0 ? (
            <div className="space-y-4">
              {files.documents.map((file: Models.Document) => (
                <div
                  key={file.$id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <Link
                    href={file.url}
                    target="_blank"
                    className="flex items-center flex-1 gap-4"
                  >
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      imageClassName="w-12 h-12 lg:w-16 lg:h-16"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-lg font-medium truncate">
                        {file.name}
                      </p>
                      <FormattedDateTime
                        date={file.$createdAt}
                        className="text-sm text-muted-foreground"
                      />
                    </div>
                  </Link>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ActionDropdown file={file} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileIcon className="h-16 w-16 text-muted-foreground mb-6" />
              <p className="text-muted-foreground text-lg">
                No files uploaded yet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
