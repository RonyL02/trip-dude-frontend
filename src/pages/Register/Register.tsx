import { FormProvider } from "react-hook-form";
import { Card } from "../../components/Card/Card";
import { useValidatedForm } from "../../components/forms";
import { registerSchema, RegisterSchemaType } from "./registerSchema";
import { RegisterForm } from "./comonents/RegisterForm";
import styles from "./Register.module.css";
import { Button } from "../../components/Button";
import { register } from "../../api/authApi";

export const Register = () => {
  const form = useValidatedForm(registerSchema);

  const handleRegister = async (schema: RegisterSchemaType) => {
    const response = await register(schema);
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.registerCard}>
        <h1 className={styles.title}>New Account</h1>
        <FormProvider {...form}>
          <RegisterForm />
        </FormProvider>
        <Button
          className={styles.button}
          text="Register"
          onClick={form.handleSubmit(handleRegister)}
        />
      </Card>
    </div>
  );
};
