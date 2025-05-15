export interface BaladeModel {
  id: number;
  name: string;
  location: string;
  duration: number;
  favoriteIds: number[];
  tagIds: number[];
  tags: { id: number; name: string; icon: string }[];
}
