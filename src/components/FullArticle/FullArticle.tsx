// import style from './FullArticle.module.scss'
import { article } from "@/types";
import { useLoaderData } from "react-router";
import Article from "../Article";

// interface FullArticleProps {
// }

export default function FullArticle() {
  const data = useLoaderData() as article;
  return <Article data={data} open></Article>;
}
