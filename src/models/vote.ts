import { Models } from 'appwrite';

export interface Vote extends Models.Document {
  voterId: string;
  photo1Id: string;
  photo2Id: string;
  result: number;
}
