export interface Photo {
  fileName: string;
  altText: string;
  rating: number;
  rd: number;
  vol: number;
}

export interface Vote {
  photos: [string, string];
  result: 0 | 0.5 | 1;
}

export interface Database {
  photos: Photo[];
  votes: Vote[];
}
