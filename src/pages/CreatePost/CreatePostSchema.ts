import { z } from "zod";
import { imageSchema } from "../../components/forms/ImageField";

export const createPostSchema = z.object({
  description: z.string().min(1, "Description is required"),
  image: imageSchema,
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>
