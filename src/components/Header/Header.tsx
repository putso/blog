import style from "./Header.module.scss";
import { Avatar, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { userType } from "@/api/user";
import avatarSrc from "@/assets/avatar.svg";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/slice/userSlice";
import { classnames } from "@/utils";
interface HeaderProps {
  user: userType | undefined;
}

export default function Header({ user }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (user)
    return (
      <Layout>
        <div className={style.user}>
          <Button className={classnames(style.btn, style.btn__green)}>
            <Link to="/new-article">Create article</Link>
          </Button>
          <Link to={"/profile"} className={style.profile}>
            <div>
              <h2 className={style.name}>{user.username}</h2>
            </div>
            <Avatar size={46} src={user.image} icon={<img src={avatarSrc} />} />
          </Link>
        </div>
        <Button
          onClick={() => {
            dispatch(logout());
            navigate("/articles");
          }}
          className={classnames(style.btn, style.btn__black)}
        >
          Log out
        </Button>
      </Layout>
    );
  return (
    <Layout>
      <Button type="text">
        <Link to={"/sing-in"}>Sign In</Link>
      </Button>
      <Button className={classnames(style.btn, style.btn__green)}>
        <Link to={"/sing-up"}>Sign Up</Link>
      </Button>
    </Layout>
  );
}
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <header className={style.header}>
      <Link className={style.name} to={"/articles"}>
        Realworld Blog
      </Link>
      {children}
    </header>
  );
};
