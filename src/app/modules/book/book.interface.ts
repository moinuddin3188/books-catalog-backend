import { ObjectId, SortOrder } from "mongoose";

export type IBook = {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  genre: string[];
  price: number;
  imageUrl?: string;
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string[];
  publicationYear?: number[];
  sortBy?: string;
  sortOrder?: SortOrder;
};
