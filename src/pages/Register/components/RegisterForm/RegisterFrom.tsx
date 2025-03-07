import { FormInput } from "../../../../components/forms";
import styles from "./RegisterForm.module.css";
import { ImageField } from "../../../../components/forms/ImageField";
export const RegisterForm = () => {
  return (
    <div className={styles.container}>
      <FormInput name="email" type="email" />
      <FormInput name="username" type="text" />
      <FormInput name="password" type="password" />
      <ImageField name="imageUrl" defaultImgUrl="default-avatar.png"/>
    </div>
  );
};
