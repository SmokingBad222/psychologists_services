import * as yup from "yup";

export const authSchema = yup.object({
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

export type AuthFormValues = yup.InferType<typeof authSchema>;