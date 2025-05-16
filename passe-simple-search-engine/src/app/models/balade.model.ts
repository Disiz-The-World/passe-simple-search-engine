export interface BaladeModel {
  id: number;
  name: string;
  location: number;
  duration: number;
  favoriteIds: number[];
  ratings: number[];
  tagIds: number[];
  tags: { id: number; name: string; icon: string }[];
}
