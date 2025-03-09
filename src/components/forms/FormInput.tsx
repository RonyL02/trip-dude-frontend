import { FC, HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
type Props = {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

export const FormInput: FC<Props> = ({ name, placeholder, type = "text" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <input
        className={styles.formInput}
        type={type}
        {...register(name)}
        placeholder={placeholder ?? name}
      />

      {errors[name]?.message && (
        <p className={styles.formError}>{errors[name].message.toString()}</p>
      )}
    </>
  );
};
