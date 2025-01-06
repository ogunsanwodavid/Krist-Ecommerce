import { z } from "zod";

export const UpdateProfileFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim()
    .min(1, { message: "Email is required." }),
});

export type UpdateProfileFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;
