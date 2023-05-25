import { Account, Client, Databases } from 'appwrite';

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
