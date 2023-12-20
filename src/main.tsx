import ReactDOM from "react-dom/client";
import { store } from "@/store/store";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { articlesRout } from "./routes/ArticlesRouter";
import { articleRout } from "./routes/ArticleRouter";
import AuthForm from "./components/AuthForm";
import { Provider } from "react-redux";
import Root from "./routes/Root";
import LoginForm from "./components/LoginForm";
import ArticleForm from "./components/ArticleForm";
import Profile from "./components/Profile";
import { editArticleRout } from "./routes/EditArtcileRouter";
import { redirect } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    loader: ({ request }) => {
      if (new URL(request.url).pathname == "/") return redirect("/articles");
      return null;
    },
    errorElement: <ErrorComponent></ErrorComponent>,
    children: [
      articlesRout,
      articleRout,
      editArticleRout,
      {
        path: "/sing-up",
        element: <AuthForm></AuthForm>,
      },
      {
        path: "/sing-in",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/new-article",
        element: <ArticleForm></ArticleForm>,
      },
      { path: "/profile", element: <Profile></Profile> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // </React.StrictMode>
);
