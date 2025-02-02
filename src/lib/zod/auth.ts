import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username too short" })
    .max(50, { message: "Username to long" }),
  email: z.string().email({ message: "Invalid eamil" }),
  password: z
    .string()
    .min(12, { message: "Password to short" })
    .max(100, { message: "Password to long" }),
});

export type SignUpData = z.infer<typeof SignUpSchema>;

export const SignInSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username too short" })
      .max(50, { message: "Username too long" })
      .optional(),
    email: z.string().email({ message: "Invalid email" }).optional(),
    password: z
      .string()
      .min(12, { message: "Password too short" })
      .max(100, { message: "Password too long" }),
  })
  .refine((data) => data.username || data.email, {
    message: "Either username or email must be provided",
  });

export type SignInData = z.infer<typeof SignInSchema>;
