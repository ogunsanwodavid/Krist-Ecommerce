import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        rememberMe?: string[];
      };
      message?: string;
    }
  | undefined;

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

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email." })
    .trim(),
});

export type ForgotPasswordFormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export const VerifyEmailFormSchema = z.object({
  otp: z.string().min(1, { message: "OTP is required." }),
});

export const ResetPasswordFormSchema = z
  .object({
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

export type ResetPasswordFormState =
  | {
      errors?: {
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
