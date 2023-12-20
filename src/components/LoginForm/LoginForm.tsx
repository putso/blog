import style from "./LoginForm.module.scss";
import { Button, Card, Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlFormInput from "../ControlFormInput";
import { classnames } from "@/utils";
import { responseErrors, userType, userLoginFetch } from "@/api/user";
import { Entries } from "@/types";
import { useAppDispatch } from "@/store/store";
import * as yup from "yup";
import { login } from "@/store/slice/userSlice";
import { formSchema, validSchema } from "@/models/loginModel";
import { useState } from "react";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validSchema),
  });

  const [defaultError, setDefaultError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function setErrors(errors: Pick<responseErrors, "password" | "email">) {
    (Object.entries(errors) as Entries<typeof errors>).forEach((el) => {
      if (!el) return;
      const [key, value] = el;

      if (Object.hasOwn(validSchema.fields, key))
        setError(key, { message: value });
      else setDefaultError(el.join(" "));
    });
  }
  function register(user: userType) {
    dispatch(login(user));
    navigate("/articles");
  }
  const onSubmit: SubmitHandler<yup.InferType<typeof validSchema>> = async (
    user,
  ) => {
    const { password, email } = user;
    setDefaultError("");
    const response = await userLoginFetch({ password, email });
    if (response.errors) setErrors(response.errors);
    else if (response.user) register(response.user);
  };
  return (
    <Card className={style.form}>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <h2 className={style.center}>Create new account</h2>
        {formSchema.map((item, i) => (
          <ControlFormInput
            errors={errors}
            control={control}
            {...item}
            key={i}
          ></ControlFormInput>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <p className={classnames(style.center, style.footer__text)}>
            Already have an account? <Link to={"../sing-up"}>Sign Up.</Link>
          </p>
          {defaultError && (
            <p style={{ color: "red", textAlign: "center" }}>{defaultError}</p>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
}
