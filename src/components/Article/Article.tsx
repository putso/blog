import style from "./Article.module.scss";
import Like from "../Like";
import { Avatar, Button, Modal, Tag } from "antd";
import { article } from "@/types";
import { format, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { useState } from "react";
import { useAppSelector } from "@/store/store";
import { selectUser } from "@/store/slice/userSlice";
import { classnames } from "@/utils";
import { deleteArticle } from "@/api/articles";
import avatar from "@/assets/avatar.svg";
interface ArticleProps {
  data: article;
  open?: boolean;
}

export default function Article({ data, open = false }: ArticleProps) {
  if (open) console.log(data);
  const [count, setCount] = useState(data.favoritesCount);
  const { user } = useAppSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const tagList = data.tagList.filter((el) => el);
  const navigate = useNavigate();
  const deleteHandler = () => {
    deleteArticle(data.slug);
    navigate("/articles");
  };
  return (
    <article className={classnames(style.article, open ? style.open : "")}>
      <header>
        <div className={style.header}>
          <div className={style.article__info}>
            <h1 className={style.article__name}>
              <Link to={`../article/${data.slug}`}>{data.title}</Link>
            </h1>
            <div className={style.like}>
              <Like
                slug={data.slug}
                value={data.favorited}
                callback={(value: number) => setCount((count) => count + value)}
              ></Like>
              <span className={style.count}>{count}</span>
            </div>

            <div className={style.tagList}>
              {tagList.map((tag, i) => (
                <Tag className={style.tag} key={i}>
                  {tag}
                </Tag>
              ))}
            </div>
            <p className={classnames(style.sub_header)}>{data.description}</p>
          </div>
          <div>
            <div className={style.user}>
              <div>
                <h2 className={style.name}>{data.author.username}</h2>
                <span className={style.date}>
                  {format(parseISO(data.createdAt), "MMMM, dd yyyy")}
                </span>
              </div>
              <Avatar
                size={46}
                src={data.author.image}
                icon={<img src={avatar}></img>}
              />
            </div>
            {open && data.author.username === user?.username && (
              <div>
                <Button danger onClick={() => setOpenModal(true)}>
                  Delete
                </Button>{" "}
                <Button className={classnames(style.btn, style.btn__green)}>
                  <Link to={`./edit`}>Edit</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      {open && <Markdown className={style.markdown}>{data.body}</Markdown>}
      <Modal
        open={openModal}
        onOk={() => {
          deleteHandler();
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <p>You sure delete article?</p>
      </Modal>
    </article>
  );
}
