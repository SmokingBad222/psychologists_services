import * as yup from "yup";

export const appointmentSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    phone: yup
        .string()
        .trim()
        .min(6, "Phone must be at least 6 characters")
        .required("Phone is required"),
    email: yup
        .string()
        .trim()
        .email("Enter a vail email")
        .required("Email is required"),
    comment: yup
        .string()
        .trim()
        .min(10, "Comment must be at least 10 characters")
        .required("Comment is required"),
});

export type AppointmentFormValues = yup.InferType<typeof appointmentSchema>;