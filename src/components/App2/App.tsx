import React from "react";
import style from "./App.module.scss";
import Root from "@/routes/Root";
import { articlesRout } from "@/routes/ArticlesRouter";
import { articleRout } from "@/routes/ArticleRouter";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthForm from "../AuthForm";
import { useAppDispatch } from "@/store/store";
import { getCurrentUserFetch } from "@/api/user";
import { hasToken } from "@/store/localStorage";
import { LoadingOutlined } from "@ant-design/icons";
import { login } from "@/store/slice/userSlice";
import { Spin } from "antd";
import Supsense from "../Supsense";

interface AppProps {}
export default function App({}: AppProps) {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
}
