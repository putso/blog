import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  RouteObject,
} from "react-router";
import EditArticle from "@/components/EditArticle";
const path = `article/:slug/edit` as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof path>>;
}
async function loader({ params }: Args) {
  const slug = params.slug;
  return { id: slug };
}
export const editArticleRout: RouteObject = {
  path,
  loader,
  element: <EditArticle />,
};
