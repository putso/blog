import React, { useState } from "react";
import style from "./ArticleForm.module.scss";
import { ArticleFormData, createArticle, editArticle } from "@/api/articles";
import ControlFormInput from "../ControlFormInput";
import * as yup from "yup";
import { Button, Card, Form } from "antd";
import { classnames, hasOwnProperty } from "@/utils";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { FieldType } from "@/types";
interface ArticleFormProps {
  data?: ArticleFormData;
  id?: string;
}
const validSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required("Text is required field"),
  tagList: yup.array().of(yup.string().required()).required(),
});

const formSchema: FieldType<typeof validSchema>[] = [
  {
    name: "title",
    type: "input",
    label: "Titlle",
  },
  {
    name: "description",
    type: "input",
    label: "Short description",
  },
  {
    name: "body",
    type: "textarea",
    label: "Text",
  },
];
export default function ArticleForm({ data, id }: ArticleFormProps) {
  let defaultFeilds: { [n: string]: any } = {};
  if (data) {
    Object.keys(validSchema.fields).forEach((key) => {
      if (hasOwnProperty(data, key)) defaultFeilds[key] = data[key];
    });
  } else defaultFeilds = {};
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultFeilds },
    resolver: yupResolver(validSchema),
  });
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "tagList",
  });
  const navigate = useNavigate();
  const [defError, setDefError] = useState("");
  const onSubmit = async (data: ArticleFormData) => {
    const response = id
      ? await editArticle(data, id)
      : await createArticle(data);
    if ("error" in response) {
      Object.entries(response.error).forEach((item) => {
        const [key, value] = item;
        const prop = key as keyof yup.InferType<typeof validSchema>;
        if (prop in validSchema.fields) setError(prop, { message: value });
        else setDefError(value);
      });
    } else {
      navigate(`/article/${response.article.slug}`);
    }
  };
  const title = data ? "Edit Article" : "Create new article";
  return (
    <Card className={style.form}>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <h2 className={style.center}>{title}</h2>
        {formSchema.map((item, i) => (
          <ControlFormInput
            errors={errors}
            control={control}
            {...item}
            key={i}
          ></ControlFormInput>
        ))}
        <Form.Item label="Tags">
          <div className={style.tags}>
            <div className={style.tags__list}>
              {fields.map((field, i) => (
                <div key={field.id} className={style.line}>
                  <div className={style.tag}>
                    <ControlFormInput
                      errors={errors}
                      control={control}
                      defaultValue={defaultFeilds?.tagList[i] || ""}
                      name={`tagList[${i}]` as any}
                      placeholder="tag"
                      type="input"
                    ></ControlFormInput>
                  </div>
                  <Button danger onClick={() => remove(i)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
            <div className={classnames(style.line, style.tag_add)}>
              <Button type="primary" onClick={() => append(" ")} ghost>
                Add tag
              </Button>
            </div>
          </div>
        </Form.Item>
        {defError && <p color="red">{defError}</p>}
        <Button htmlType="submit" type="primary" block className={style.submit}>
          Send
        </Button>
      </Form>
    </Card>
  );
}
