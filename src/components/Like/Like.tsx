import { useState } from "react";
import style from "./Like.module.scss";
import activeSrc from "@/assets/active_heart.svg";
import emptySrc from "@/assets/empty_heart.svg";
import { favoriveArticle } from "@/api/articles";
interface LikeProps {
  value: boolean;
  slug: string;
  callback: (value: number) => void;
}

export default function Like({ value, slug, callback }: LikeProps) {
  const [checked, setChecked] = useState(value);
  return (
    <label className={style.like}>
      <input
        type="checkbox"
        checked={checked}
        onChange={async (e) => {
          setChecked(e.target.checked);
          callback(e.target.checked ? 1 : -1);
          favoriveArticle(slug, e.target.checked);
        }}
      />
      <img src={checked ? activeSrc : emptySrc} alt="Like" />
    </label>
  );
}
