import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
});


export type CreatePostSchemaType = {
  title: string;
  description: string;
  imageUrl: string;
  activityType: string;
};