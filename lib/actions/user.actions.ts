"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { RouteUrls } from "../enums";
import { redirect } from "next/navigation";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOtp = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch {
    throw new Error("Failed to send an otp");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const isExistingUser = await getUserByEmail(email);

  const accountId = await sendEmailOtp({ email });

  if (!accountId) throw new Error("Failed to send an otp");

  if (!isExistingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        email,
        fullName,
        avatar:
          "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1731488142~exp=1731491742~hmac=43da2b447953770ff2426003b44dc9e04ce095c0b95ce265d10933407b69377b&w=826",
        accountId,
      }
    );
  }

  return parseStringify({ accountId });
};

export const verifyOtp = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: RouteUrls.ROOT,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", [result.$id])]
  );

  return user.total <= 0 ? null : parseStringify(user.documents[0]);
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    console.log(error);
  } finally {
    redirect(RouteUrls.SIGN_IN);
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOtp({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    console.log(error);
  }
};
