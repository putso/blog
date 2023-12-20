import React from "react";
import style from "./ControlFormInput.module.scss";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Checkbox, Input, Form } from "antd";
import { inputType } from "@/types";
import TextArea from "antd/es/input/TextArea";
interface ControlFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  errors: FieldErrors<T>;
  type: inputType;
  label?: string;
  text?: string;
  defaultValue?: string;
}

export default function ControlFormInput<T extends FieldValues>({
  control,
  name,
  placeholder = "",
  errors,
  type,
  label = "",
  text = "",
  defaultValue = "",
}: ControlFormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as any}
      render={({ field, fieldState }) => (
        <Form.Item
          validateStatus={fieldState.invalid ? "error" : "success"}
          help={errors[name]?.message as string}
          className={style.label}
          name="name"
          label={type != "checkbox" && label}
        >
          <FormInput
            fields={field}
            type={type}
            text={text}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    ></Controller>
  );
}
function FormInput<T extends FieldValues>({
  fields,
  placeholder = "",
  type,
  text,
}: {
  fields: ControllerRenderProps<T, Path<T>>;
  placeholder: string;
  type: inputType;
  text: string;
}) {
  if (type == "checkbox")
    return (
      <Checkbox {...fields} checked={fields.value}>
        {text}
      </Checkbox>
    );
  if (type == "password")
    return <Input.Password {...fields} placeholder={placeholder} />;
  if (type == "email") return <Input {...fields} placeholder={placeholder} />;
  if (type == "textarea")
    return <TextArea rows={4} {...fields} placeholder={placeholder} />;
  return <Input {...fields} placeholder={placeholder} {...fields} />;
}
