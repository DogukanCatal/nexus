import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" }),
  surname: z
    .string({ required_error: "Surname is required" })
    .min(2, { message: "Surname must be at least 2 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  address: z
    .string({ required_error: "Address is required" })
    .min(10, { message: "Address must be at least 10 characters" }),

  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
