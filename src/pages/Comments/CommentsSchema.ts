import { z } from "zod";

export const CommentSchema = z.object({
  username: z.string().min(1, "Username is required"),
  text: z.string().min(1, "Comment text is required"),
});
