import { FC, HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
type Props = {
  name: string;
  type: HTMLInputTypeAttribute;
};

export const TextInput: FC<Props> = ({ name, type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input
        className={styles.formInput}
        type={type}
        {...register(name)}
        placeholder={name}
      />
      {errors[name]?.message && (
        <p className={styles.formError}>{errors[name].message.toString()}</p>
      )}
    </div>
  );
};
