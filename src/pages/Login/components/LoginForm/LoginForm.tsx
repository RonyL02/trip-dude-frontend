import { FormInput } from "../../../../components/forms";
import styles from "./LoginForm.module.css";
export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <FormInput name="email" type="email" />
      <FormInput name="password" type="password" />
    </div>
  );
};
