import { FormProvider } from "react-hook-form";
import { Card } from "../../components/Card/Card";
import { useValidatedForm } from "../../components/forms";
import { createPostSchema, CreatePostSchemaType } from "./CreatePostSchema";
import styles from "./CreatePost.module.css";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { createPost } from "../../api/postApi";
import { upload } from "../../api/fileApi";
import { CreatePostDto } from "../../api/types";
import { CreatePostForm } from "./components/CreatePostForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const CreatePost = () => {
  const form = useValidatedForm(createPostSchema);
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();

  const handleCreatePost = async (schema: CreatePostSchemaType) => {
    try {
      const { description, image } = schema;
      const { newFileUrl } = await upload(image);
      const newPost: CreatePostDto = {
        description,
        imageUrl: newFileUrl,
        activityId: activityId!,
      };

      await createPost(newPost);

      toast.success("Post created successfully");

      navigate("/profile/my-posts");
    } catch {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.createPostCard}>
        <Title text="Make a Post" />
        <FormProvider {...form}>
          <CreatePostForm />
        </FormProvider>
        <Button
          className={styles.button}
          text="Create Post"
          onClick={form.handleSubmit(handleCreatePost)}
        />
      </Card>
    </div>
  );
};
