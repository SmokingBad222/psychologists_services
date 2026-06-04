import * as yup from "yup";

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export const authSchema: yup.ObjectSchema<AuthFormValues> = yup.object({
  name: yup.string().trim().optional(),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});