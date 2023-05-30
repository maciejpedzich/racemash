import { Models } from 'appwrite';

export interface PhotoAppearanceCount extends Models.Document {
  voterId: string;
  photoId: string;
  count: number;
}
