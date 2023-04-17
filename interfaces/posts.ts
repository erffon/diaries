export interface PostsType {
  slice: any;
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  description: string;
  tag: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  categories: Categories;
}
export interface Categories {
  data: Datumm[];
}
export interface Datumm {
  id: number;
  attributes: DatummAttributes;
}

export interface DatummAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
