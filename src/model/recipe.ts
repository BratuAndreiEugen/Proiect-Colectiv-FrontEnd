export type Recipe = {
  id: number,
  title: string,
  caption: string,
  averageRating: number,
  thumbnailLink: string,
  videoLink: string,
  uploadDate: Date,
  posterId: string,
}

export type RecipeShort = {
  id: number;
  title: string;
  posterId: string;
  thumbnailLink: string;
  posterUsername: string;
  caption?: string;
  healthAverageRating: number;
  nutritionAverageRating: number;
  tasteAverageRating: number;
}

export type RecipeList = RecipeShort[];
