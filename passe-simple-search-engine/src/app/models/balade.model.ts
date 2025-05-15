// Données brutes du backend
export interface RawBalade {
  id: number;
  name: string;
  catchPhrase: string;
  duration: number;
  location: number;
  previewPath?: string;
  favoriteIds: number[];
  ratings: number[];
  tagIds: number[];
  tags?: { id: number; name: string; icon: string }[];
  content?: {
    sections?: {
      content: {
        type: string;
        path: string;
      }[];
    }[];
  };
}

export interface BaladeModel {
  id: number;
  name: string;
  description: string;
  image: string;
  duration: number;
  location: number;
  ratings: number;
  favoriteIds: number[];
  tagIds: number[];
  tags?: { id: number; name: string; icon: string }[];
}
