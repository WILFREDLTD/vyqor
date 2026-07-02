import { z } from "zod";

export const consultationSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  service: z.string().min(1, "Select a service"),
  selectedDate: z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), "Select a future date"),
  selectedTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  additionalNotes: z.string().optional(),
  // Make googleMeetLink optional. If omitted by the user we will fall back to an
  // environment-provided Google Meet URL on the server when persisting/sending.
  // Accept empty string (user left it blank) or a valid Google Meet URL.
  googleMeetLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/meet\.google\.com\/.+/.test(val),
      { message: "Must be a Google Meet link (https://meet.google.com/...)" }
    ),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const AVAILABLE_HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export enum FormStep {
  PERSONAL_INFO = 0,
  DATE_SELECTION = 1,
  TIME_SELECTION = 2,
  NOTES_AND_LINK = 3,
  REVIEW = 4,
}
