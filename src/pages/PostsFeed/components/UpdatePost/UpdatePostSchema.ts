import { z } from "zod";
import { imageSchema } from "../../../../components/forms/ImageField";

export const updatePostSchema = z.object({
  description: z.string().min(1, "Description is required").trim().optional(),
  image: imageSchema,
});

export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>
