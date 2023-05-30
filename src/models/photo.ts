import { Models } from 'appwrite';

export interface Photo extends Models.Document {
  url: string;
  rating: number;
  ratingDeviation: number;
  volatility: number;
  altText: string;
}
