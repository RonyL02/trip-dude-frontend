import { FormProvider } from "react-hook-form";
import styles from "./UpdatePost.module.css";
import { toast } from "react-toastify";
import { updatePostSchema, UpdatePostSchemaType } from "./UpdatePostSchema";
import { useValidatedForm } from "../../../../components/forms";
import { upload } from "../../../../api/fileApi";
import { CreatePostDto, Post } from "../../../../api/types";
import { updatePost } from "../../../../api/postApi";
import { Card } from "../../../../components/Card/Card";
import { UpdatePostForm } from "./components/UpdatePostForm";
import { Button } from "../../../../components/Button";
import { FC } from "react";

type Props = {
  post: Post;
};

export const UpdatePost: FC<Props> = ({ post }) => {
  const form = useValidatedForm(updatePostSchema, {
    description: post.description,
  });

  const handleUpdate = async (schema: UpdatePostSchemaType) => {
    const { image, ...postData } = schema;
    let newFileUrl: string | undefined;
    if (image) {
      newFileUrl = (await upload(image)).newFileUrl;
    }
    const updatedPost: Partial<CreatePostDto> = {
      ...postData,
      ...(newFileUrl ? { imageUrl: newFileUrl } : {}),
    };

    await updatePost(post._id, updatedPost);
    form.reset(form.getValues());
    toast.success("Post Updated Successfully");
  };

  return (
    <div className={styles.container}>
      <Card className={styles.createPostCard}>
        <FormProvider {...form}>
          <UpdatePostForm imageUrl={post.imageUrl} />
        </FormProvider>
        <Button
          className={styles.button}
          text="Update Post"
          disabled={
            Object.values(form.formState.touchedFields).filter(Boolean)
              .length === 0
          }
          onClick={form.handleSubmit(handleUpdate)}
        />
      </Card>
    </div>
  );
};
