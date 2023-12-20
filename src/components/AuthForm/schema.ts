import { inputType } from "@/types";
import * as yup from "yup";
export const validSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(40).required(),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], "passworld not same")
      .required(),
    agre: yup.boolean().oneOf([true]).required(),
  })
  .required();
export const formSchema: {
  name: keyof yup.InferType<typeof validSchema>;
  label?: string;
  type: inputType;
  text?: string;
}[] = [
  {
    name: "username",
    label: "Username",
    type: "input",
  },
  {
    name: "email",
    label: "Email addres",
    type: "input",
  },
  {
    name: "password",
    label: "Passworld",
    type: "password",
  },
  {
    name: "password2",
    label: "Repeat Passworld",
    type: "password",
  },
  {
    name: "agre",
    text: "I agree to the processing of my personal information",
    type: "checkbox",
  },
];
