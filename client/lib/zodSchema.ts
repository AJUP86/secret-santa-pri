import { z } from 'zod';

const dateRegex = /^\d{2}-\d{2}-\d{4}$/; // Regex for YYYY-MM-DD format
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex for HH:mm format

const emailSchema = z
  .string()
  .email({ message: 'Invalid email format' })
  .refine((email) => email.endsWith('@gmail.com'), {
    message: 'Must be a Gmail address',
  });

export const UserEmailValidation = z.object({
  emails: z
    .string()
    .min(1, 'Emails are required')
    .transform((str) => str.split(',').map((s) => s.trim()))
    .refine(
      (emailsArray) =>
        emailsArray.every((email) => emailSchema.safeParse(email).success),
      {
        message: 'All emails must be valid Gmail addresses',
      }
    )
    .refine((emailsArray) => emailsArray.length >= 3, {
      message: 'At least 3 emails are required',
    }),
});

export const eventValidation = z.object({
  name: z.string().min(1, 'The name of the event is required is required'),
  description: z
    .string()
    .min(5, 'Event description is required')
    .max(350, 'Event description must not exceed 350 characters'),
});

export const EventDateValidation = z.object({
  date: z
    .string()
    .regex(dateRegex, { message: 'Invalid date format. Use DD-MM-YYYY.' })
    .refine((date) => {
      const [day, month, year] = date.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      return (
        dateObj.getDate() === day &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getFullYear() === year
      );
    }, 'Invalid date'),
  time: z
    .string()
    .regex(timeRegex, { message: 'Invalid time format. Use HH:mm.' }),
});
