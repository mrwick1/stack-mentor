import { z } from 'zod';

export const userSignupSchema = z.object({
    username: z.string().min(3),
    firstName: z.string(),
    lastName: z.string(),
    birthday: z.coerce.date(),
    email: z.string().email(),
    password: z.string().min(6),
});

export const UserSigninSchema = z.object({
    identifier: z.string(),
    password: z.string()
})
