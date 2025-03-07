import { FormInput } from "../../../../components/forms";
import styles from "./CreatePostForm.module.css";
import { ImageField } from "../../../../components/forms/ImageField";

export const CreatePostForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="title">Post Title</label>
        <FormInput name="title" type="text" />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="description">Description</label>
        <textarea 
          name="description"
          className={styles.textarea}
          placeholder="Write something about this post..."
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="imageUrl">Upload Image</label>
        <ImageField name="imageUrl" />
      </div>
    </div>
  );
};
