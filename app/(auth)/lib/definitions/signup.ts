import { z } from "zod";

export const SignupFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z
      .string()
      .email({ message: "Please enter a valid email." })
      .trim()
      .min(1, { message: "Email is required." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords must match.",
      });
    }
  });

export type SignupFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
