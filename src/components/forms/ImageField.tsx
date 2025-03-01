import { ChangeEvent, FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { upload } from "../../api/fileApi";
import styles from "./styles.module.css";
type Props = {
  name: string;
};

export const ImageField: FC<Props> = ({ name }) => {
  const { setValue } = useFormContext();
  const [image, setImage] = useState<string | null>(null);
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { newFileUrl } = await upload(file);
      setValue(name, newFileUrl);
      setImage(newFileUrl);
    }
  };

  return (
    <div>
      <label htmlFor="imagePicker" className={styles.imageInput}>
        <img
          width={"100%"}
          height={"100%"}
          src={image ?? "default-avatar.png"}
          className={styles.imagePreview}
        />
      </label>
      <input
        id="imagePicker"
        name={name}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};
