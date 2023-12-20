import { FieldType } from "@/types";
import * as yup from "yup";
export const validSchema = yup
  .object({
    password: yup.string().required(),
    email: yup.string().required(),
  })
  .required();
export const formSchema: FieldType<typeof validSchema>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Username",
    type: "password",
  },
];
