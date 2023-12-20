import Article from "../Article";
import style from "./ArticleList.module.scss";
import { useLoaderData } from "react-router";
import { article } from "@/types";
import { Pagination, Spin } from "antd";
import { useSubmit } from "react-router-dom";
import { ArticlesResponse, getArticles } from "@/api/articles";
import Supsense from "../Supsense";
export type pagination = {
  response: {
    articles: article[];
    articlesCount: number;
  };
  page: number;
};
export default function ArticleList() {
  const data = useLoaderData() as {
    // response: Promise<ArticlesResponse>;
    page: number;
  };
  const promise = getArticles(data.page, 20);
  return (
    <Supsense
      loader={
        <Spin size={"large"} className={style.spin}>
          {" "}
        </Spin>
      }
      promise={promise}
      callback={(response: ArticlesResponse) => {
        return <List data={{ response, page: data.page }}></List>;
      }}
    ></Supsense>
  );
}
function List({ data }: { data: pagination }) {
  const response = data.response;
  const page = data.page;
  const articles = response.articles;
  window.scrollTo(0, 0);

  const submit = useSubmit();
  const paginationHandler = (page: number) => {
    const formData = new FormData();
    formData.set("page", String(page));
    submit(formData);
  };
  return (
    <div className={style.list}>
      {articles.map((item) => (
        <Article key={item.slug} data={item} />
      ))}
      <Pagination
        defaultCurrent={1}
        current={page}
        pageSize={20}
        total={response.articlesCount}
        onChange={paginationHandler}
      />
      ;
    </div>
  );
}
