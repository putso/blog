import { ActionFunctionArgs, ParamParseKey, Params } from "react-router";
import * as yup from "yup";

export type article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type inputType =
  | "input"
  | "checkbox"
  | "password"
  | "email"
  | "textarea";

export type FieldType<T extends yup.ObjectSchema<object>> = {
  name: keyof yup.InferType<T>;
  label?: string;
  type: inputType;
  text?: string;
};

export interface Args<T extends string> extends ActionFunctionArgs {
  params: Params<ParamParseKey<T>>;
}
