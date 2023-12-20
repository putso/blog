import { useLoaderData } from "react-router";
import ArticleForm from "../ArticleForm";
import { article } from "@/types";
import Supsense from "../Supsense";
import { getArticle } from "@/api/articles";
import Loader from "../Loader";
import { Alert } from "antd";

export default function EditArticle() {
  const { id } = useLoaderData() as { id: string };
  if (!id) return <Alert message="Error " type="error" />;
  const response = getArticle(id || "");
  return (
    <Supsense
      promise={response}
      callback={(data: { article: article }) => (
        <ArticleForm data={data.article} id={id}></ArticleForm>
      )}
      loader={<Loader></Loader>}
    ></Supsense>
  );
}
