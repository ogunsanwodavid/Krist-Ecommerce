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
