import { ChangeEvent, FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import { z } from "zod";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "../../consts";
type Props = {
  name: string;
  defaultImgUrl?: string;
  displayMode?: "contain" | "cover" | "fill";
};

export const imageSchema = z
  .any()
  .optional()
  .refine((files) => {
    return files?.[0]?.size <= MAX_FILE_SIZE;
  }, `Max image size is 5MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const ImageField: FC<Props> = ({
  name,
  defaultImgUrl,
  displayMode = "contain",
}) => {
  const { setValue } = useFormContext();
  const [image, setImage] = useState<string | null>(null);
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
        <img
          style={{ objectFit: displayMode }}
          src={image ?? defaultImgUrl}
          className={styles.image}
        />
        {!image && !defaultImgUrl && <p>Click to upload an image</p>}
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        className={styles.imageInput}
        onChange={handleFileChange}
      />
    </div>
  );
};
