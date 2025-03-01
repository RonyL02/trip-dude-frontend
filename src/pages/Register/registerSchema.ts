import z from 'zod'

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty().trim(),
    username: z.string().nonempty().trim(),
    imageUrl: z.string().optional()
})

export type RegisterSchemaType = z.infer<typeof registerSchema>