import z from "zod";

export const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email(),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(12, "Phone number must be at most 12 digits")
        .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
    service: z.string().min(1, "Please select a service"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});