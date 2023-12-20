import React from "react";
import style from "./ErrorComponent.module.scss";
import { Alert } from "antd";

export default function ErrorComponent() {
  return (
    <div className={style["error-component"]}>
      <Alert
        message="Error"
        description="Something was wrong"
        type="error"
        showIcon
      />
    </div>
  );
}
