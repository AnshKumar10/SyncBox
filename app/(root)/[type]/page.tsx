import React from "react";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import FileCard from "@/components/FileCard";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import Sort from "@/components/Sort";

interface SearchParamProps {
  params?: Promise<{
    type?: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type);

  const files = await getFiles({ types, searchText, sort });

  const totalSpace = await getTotalSpaceUsed();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <section className="w-full">
        <h1 className="text-2xl font-bold capitalize mb-4">{type}</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-base">
            Total:{" "}
            <span className="text-xl font-medium">
              {convertFileSize(totalSpace?.[types[0]]?.size)}
            </span>
          </p>
          <div className="hidden sm:flex items-center space-x-2">
            <p className="text-base text-gray-500 whitespace-nowrap">
              Sort by:
            </p>
            <Sort />
          </div>
        </div>
        {files.total > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.documents.map((file: Models.Document) => (
              <div key={file.$id} className="w-full">
                <FileCard file={file} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-base text-gray-500">No files uploaded</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
