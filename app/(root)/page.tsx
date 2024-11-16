import Link from "next/link";
import { Models } from "node-appwrite";
import { FileIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Chart } from "@/components/Chart";
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

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8">
      <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
        <Card className="md:min-h-[400px] bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl lg:text-2xl font-semibold">
              Storage Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-full">
              <Chart used={totalSpace.used} />
            </div>
          </CardContent>
        </Card>
        <Card className="md:min-h-[400px] bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl lg:text-2xl font-semibold">
              File Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {usageSummary.map((summary) => (
                <Link
                  href={summary.url}
                  key={summary.title}
                  className="group rounded-lg p-3 lg:p-4 transition-all hover:bg-accent hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2 lg:mb-3">
                    <Thumbnail type={summary.icon} />
                    <span className="text-sm lg:text-base font-medium">
                      {convertFileSize(summary.size) || "0"}
                    </span>
                  </div>
                  <h4 className="text-sm lg:text-base font-medium mb-2">
                    {summary.title}
                  </h4>
                  <Separator className="my-2" />
                  <FormattedDateTime
                    date={summary.latestDate}
                    className="text-xs lg:text-sm text-muted-foreground"
                  />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Recent Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          {files.documents.length > 0 ? (
            <div className="space-y-3 lg:space-y-4">
              {files.documents.map((file: Models.Document) => (
                <div
                  key={file.$id}
                  className="flex items-center justify-between p-2 lg:p-3 rounded-lg hover:bg-accent transition-colors group"
                >
                  <Link
                    href={file.url}
                    target="_blank"
                    className="flex items-center flex-1 gap-3 min-w-0"
                  >
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      imageClassName="w-10 h-10 lg:w-12 lg:h-12"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-sm lg:text-base font-medium truncate">
                        {file.name}
                      </p>
                      <FormattedDateTime
                        date={file.$createdAt}
                        className="text-xs lg:text-sm text-muted-foreground"
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
            <div className="flex flex-col items-center justify-center py-12 lg:py-16 text-center">
              <FileIcon className="h-12 w-12 lg:h-16 lg:w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-sm lg:text-base">
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
