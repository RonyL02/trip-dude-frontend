import styles from "./CreatePostForm.module.css";
import { ImageField } from "../../../../components/forms/ImageField";
import { TextAreaField } from "../../../../components/forms/TextAreaField";

export const CreatePostForm = () => {
  return (
    <div className={styles.container}>
      <TextAreaField
        name="description"
        placeholder="Write something about this post..."
      />
      <ImageField name="image" />
    </div>
  );
};
