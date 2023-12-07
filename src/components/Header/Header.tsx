import React from "react";
import style from "./Header.module.scss";
import { Button } from "antd";
interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className={style.header}>
      <div className={style.name}>Realworld Blog</div>
      <Button type="text">Text</Button>
      <Button className={style.btn_green}>Default</Button>
    </header>
  );
}
