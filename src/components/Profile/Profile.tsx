import { Button, Card, Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import style from "./Profile.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlFormInput from "../ControlFormInput";
import { filterObjectFields } from "@/utils";
import { userType, updateUserFetch } from "@/api/user";
import { FieldType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import * as yup from "yup";
import { selectUser, updateUser } from "@/store/slice/userSlice";
// import {formSchema,validSchema} from "@/models/loginModel";
import { useState } from "react";
const validSchema = yup.object().shape({
  email: yup.string().email(),
  username: yup.string(),
  bio: yup.string(),
  image: yup.string().url(),
});

const formSchema: FieldType<typeof validSchema>[] = [
  {
    name: "username",
    type: "input",
    label: "Username",
  },
  {
    name: "email",
    label: "Email Adress",
    type: "email",
  },
  {
    name: "bio",
    type: "input",
    label: "Bio",
  },
  {
    name: "image",
    type: "input",
    label: "Avatar image (url)",
  },
];
export default function Profile() {
  const { user } = useAppSelector(selectUser);
  const {
    control,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validSchema),
    defaultValues: {
      username: user?.username,
      bio: user?.bio || "",
      email: user?.email,
      image: user?.image || "",
    },
  });

  const [defaultError, setDefaultError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function setErrors(errors: { message: string }) {
    if (errors.message) {
      const fieldNames = Object.keys(validSchema.fields);
      fieldNames
        .filter((field) => errors.message.includes(field))
        .forEach((field) =>
          setError(field as any, { message: "Required field" }),
        );
    }
  }
  const validationForm = (data: Partial<userType>) => {
    return Object.entries(data).some(([_, value]) => value);
  };
  const onSubmit: SubmitHandler<yup.InferType<typeof validSchema>> = async (
    data: Partial<userType>,
  ) => {
    if (!validationForm(data)) {
      setDefaultError("At least one field must not be empty ");
      return;
    } else if (defaultError) setDefaultError("");
    const FilteredData = filterObjectFields(data);
    const response = await updateUserFetch(FilteredData);
    if ("errors" in response) {
      setErrors(response.errors);
    } else {
      dispatch(updateUser(response.user));
      navigate("/article");
    }
  };
  return (
    <Card className={style.form}>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <h2 className={style.center}>Profile</h2>
        {formSchema.map((item, i) => (
          <ControlFormInput
            errors={errors}
            control={control}
            {...item}
            key={i}
          ></ControlFormInput>
        ))}
        <Form.Item>
          <Button type="primary" className={style.submit} htmlType="submit">
            Save
          </Button>
          {defaultError && (
            <p style={{ color: "red", textAlign: "center" }}>{defaultError}</p>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
}
