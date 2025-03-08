import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "Comment text is required").trim(),
});

export type CreateCommentSchemaType = z.infer<typeof commentSchema>

