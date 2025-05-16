export interface BaladeModel {
  id: number;
  name: string;
  catchPhrase: string;
  duration: number;
  location: number;
  previewPath: string;
  map: string;
  infos: { icon: string; name: string; description: string }[];
  ratings: number[];
  content: {
    details: string;
    sections: {
      id: number;
      title: string;
      content: {
        type: string;
        text?: string;
        path?: string;
        legend?: string;
      }[];
    }[];
  };
  attributions: { [key: string]: string };
  seeMore: string[];
  tagIds: number[];
  favoriteIds: number[];
  tags: { id: number; name: string; icon: string }[];
}
