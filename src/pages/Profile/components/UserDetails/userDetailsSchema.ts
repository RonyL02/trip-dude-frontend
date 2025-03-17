import { z } from "zod"
import { imageSchema } from "../../../../components/forms/ImageField"

export const userDetailsSchema = z.object({
    username: z.string().nonempty().trim(),
    image: imageSchema
})

export type UserDetailsSchema = z.infer<typeof userDetailsSchema>