"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import {
  constructFileUrl,
  getFileTypeAndExtension,
  parseStringify,
} from "../utils";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import {
  GetFilesPropsInterface,
  UploadFilePropsInterface,
} from "@/types/files";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFilePropsInterface) => {
  const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const { extension, type } = getFileTypeAndExtension(bucketFile.name);

    const document = {
      type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        document
      )
      .catch(async (error) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        console.log(error, "Failed to create file document");
      });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    console.log(error);
  }
};
