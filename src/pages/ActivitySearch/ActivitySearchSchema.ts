import { z } from "zod";

export const activitySearchSchema = z.object({
    location: z.string().trim(),
    description: z.string().trim()
})

export type ActivitySearchSchemaType = z.infer<typeof activitySearchSchema>
