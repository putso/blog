import style from "./Loader.module.scss";
import { Spin } from "antd";

export default function Loader() {
  return <Spin className={style.loader}></Spin>;
}
