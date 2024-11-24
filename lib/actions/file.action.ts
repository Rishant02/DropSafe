"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringfy } from "../utils";
import { revalidatePath } from "next/cache";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();
  try {
    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );
    const { type, ext } = getFileType(bucketFile.name);
    const fileDocument = {
      type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: ext,
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
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create file document");
      });
    revalidatePath(path);
    return parseStringfy(newFile);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};
