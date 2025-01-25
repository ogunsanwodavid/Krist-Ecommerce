import { z } from "zod";

export const ContactUsFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim()
    .min(1, { message: "Email is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  message: z.string().min(1, { message: "Message is required." }),
});

export type ContactUsFormState =
  | {
      errors?: {
        email?: string[];
        name: string[];
        message?: string[];
      };
      message?: string;
    }
  | undefined;
