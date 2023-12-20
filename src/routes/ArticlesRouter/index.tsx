import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  RouteObject,
} from "react-router";
import ArticleList from "@/components/ArticleList";
// import { pagination } from "@/components/ArticleList/ArticleList";
const path = `articles` as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof path>>;
}
async function loader({ request }: Args) {
  const paramPage = new URL(request.url).searchParams.get("page");
  const page = Number(paramPage) || 0;
  // const response = getArticles(page, 20);
  return { page: page };
}
export const articlesRout: RouteObject = {
  path,
  loader,
  element: <ArticleList />,
};
