import { TextInput } from "../../../../components/forms";
import styles from "./LoginForm.module.css";
export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <TextInput name="email" type="email" />
      <TextInput name="password" type="password" />
    </div>
  );
};
