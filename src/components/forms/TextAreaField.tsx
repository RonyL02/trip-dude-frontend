import { FC } from "react";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  placeholder?: string;
};

export const TextAreaField: FC<Props> = ({ name, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <textarea
        {...register(name)}
        className={styles.textarea}
        placeholder={placeholder ?? name}
      />
      {errors[name]?.message && (
        <p className={styles.formError}>{errors[name].message.toString()}</p>
      )}
    </>
  );
};
