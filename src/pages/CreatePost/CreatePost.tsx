import { FormProvider } from "react-hook-form";
import { Card } from "../../components/Card/Card";
import { useValidatedForm } from "../../components/forms";
import { createPostSchema, CreatePostSchemaType } from "./CreatePostSchema";
import styles from "./CreatePost.module.css";
import { Button } from "../../components/Button";
import { createPost } from "../../api/authApi";
import { useState } from "react";

export const CreatePost = () => {
  const form = useValidatedForm(createPostSchema);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activityType, setActivityType] = useState("Beach Vacation");

  const handleCreatePost = async (schema: CreatePostSchemaType) => {
    const response = await createPost(schema);
    console.log(response);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.createPostCard}>
        <div className={styles.activityContainer}>
          <label htmlFor="activityType" className={styles.activityLabel}>
            Activity Type
          </label>
          <select
            id="activityType"
            className={styles.activitySelect}
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option value="Beach Vacation">Beach Vacation</option>
            <option value="Hiking">Hiking</option>
            <option value="City Tour">City Tour</option>
            <option value="Ski Trip">Ski Trip</option>
            <option value="Camping">Camping</option>
          </select>
        </div>

        <div className={styles.imageUploadContainer}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className={styles.image}
            />
          ) : (
            <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
              Click to upload an image
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className={styles.imageInput}
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <FormProvider {...form}>
          <textarea
            name="description"
            className={styles.textarea}
            placeholder="Write something about this post..."
          />
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
