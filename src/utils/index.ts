import { Entries } from "@/types";

export const classnames = (...args: string[]) => args.join(" ");
export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;
export const hasOwnProperty = <T extends object>(
  data: T,
  key: any,
): key is keyof T => {
  return Object.hasOwn(data, key);
};

export const filterObjectFields = <T extends object>(object: T) =>
  Object.fromEntries(
    Object.entries(object).filter(([_, value]) => value),
  ) as Partial<T>;
