import { z } from "zod";

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
