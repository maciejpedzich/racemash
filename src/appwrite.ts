import { Account, Avatars, Client, Databases, Storage } from 'appwrite';

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(appwriteClient);
export const avatars = new Avatars(appwriteClient);
export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);
