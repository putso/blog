import style from "./AuthForm.module.scss";
import { Button, Card, Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlFormInput from "../ControlFormInput";
import { classnames } from "@/utils";
import { responseErrors, userType, userRegister } from "@/api/user";
import { Entries } from "@/types";
import { useAppDispatch } from "@/store/store";
import * as yup from "yup";
import { login } from "@/store/slice/userSlice";
import { formSchema, validSchema } from "@/models/registerModel";
export default function AuthForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function setErrors(errors: responseErrors) {
    (Object.entries(errors) as Entries<typeof errors>).forEach((el) => {
      if (!el) return;
      const [key, value] = el;
      setError(key, { message: value });
    });
  }
  function register(user: userType) {
    dispatch(login(user));
    navigate("/articles");
  }
  const onSubmit: SubmitHandler<yup.InferType<typeof validSchema>> = async (
    user,
  ) => {
    const response = await userRegister(user);
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
          <Button type="primary" htmlType="submit">
            Create
          </Button>

          <p className={classnames(style.center, style.footer__text)}>
            Already have an account? <Link to={"../sing-in"}>Sign In.</Link>
          </p>
        </Form.Item>
      </Form>
    </Card>
  );
}
