import { getArticle } from "@/api/articles";
import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  RouteObject,
} from "react-router";
import FullArticle from "@/components/FullArticle";
const path = `article/:slug` as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof path>>;
}
async function loader({ params }: Args) {
  const slug = params.slug;
  const response = await getArticle(slug || "");

  return response.article;
}
export const articleRout: RouteObject = {
  path,
  loader,
  element: <FullArticle />,
};
