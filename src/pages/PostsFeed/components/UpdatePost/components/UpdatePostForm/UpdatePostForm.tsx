import { FC } from "react";
import { ImageField } from "../../../../../../components/forms/ImageField";
import { TextAreaField } from "../../../../../../components/forms/TextAreaField";
import styles from "./UpdatePostForm.module.css";

type Props = {
  imageUrl?: string;
};

export const UpdatePostForm: FC<Props> = ({ imageUrl }) => {  
  return (
    <div className={styles.container}>
      <TextAreaField
        name="description"
        placeholder="Write something about this post..."
      />
      <ImageField
        name="image"
        defaultImgUrl={imageUrl ?? "/empty-300x240.jpg"}
      />
    </div>
  );
};
