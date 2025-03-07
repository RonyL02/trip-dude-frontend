import z from 'zod'
import { imageSchema } from '../../components/forms/ImageField';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty().trim(),
    username: z.string().nonempty().trim(),
    image: imageSchema
})

export type RegisterSchemaType = z.infer<typeof registerSchema>