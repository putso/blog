import { article } from "@/types";
import { getFetch } from "./utils";
import { authHeaders } from "@/store/localStorage";
export type ArticlesResponse = {
  articles: article[];
  articlesCount: number;
};
export const getArticles = (pageNumber: number, pageSize: number) =>
  getFetch({
    path: "/articles",
    method: "GET",
    ...authHeaders(),
    searchParams: { limit: pageSize, offset: pageSize * pageNumber },
  }) as Promise<ArticlesResponse>;
export type ArticleFormData = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};
type ArticleCreateResponse = {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: string;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
};
export const getArticle = (id: string) =>
  getFetch({ path: `/articles/${id}` }) as Promise<{ article: article }>;
export const createArticle = (body: ArticleFormData) =>
  getFetch({
    path: "/articles",
    method: "POST",
    ...authHeaders(),
    body: {
      article: body,
    },
  }) as Promise<ArticleCreateResponse | { error: { [n: string]: string } }>;
export const editArticle = (body: ArticleFormData, id: string) => {
  return getFetch({
    path: `/articles/${id}`,
    method: "PUT",
    ...authHeaders(),
    body: {
      article: body,
    },
  }) as Promise<ArticleCreateResponse | { error: { [n: string]: string } }>;
};
export const deleteArticle = (id: string) =>
  getFetch({
    path: `/articles/${id}`,
    method: "DELETE",
    ...authHeaders(),
  }) as Promise<{ error: { [n: string]: string } }>;
export const favoriveArticle = (slug: string, value: boolean) =>
  getFetch({
    path: `/articles/${slug}/favorite`,
    method: value ? "POST" : "DELETE",
    ...authHeaders(),
  }) as Promise<ArticleCreateResponse>;
