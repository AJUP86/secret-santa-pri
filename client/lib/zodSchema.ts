import { z } from 'zod';

const emailSchema = z
  .string()
  .email({ message: 'Invalid email format' })
  .refine((email) => email.endsWith('@gmail.com'), {
    message: 'Must be a Gmail address',
  });

export const FormDataSchema = z.object({
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
  name: z.string().min(1, 'The name of the event is required'),
  description: z
    .string()
    .min(5, 'Event description is required')
    .max(350, 'Event description must not exceed 350 characters'),
  date: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: 'Date cannot be in the past.',
    }
  ),
  hour: z.string(),
  minute: z.string(),
});
