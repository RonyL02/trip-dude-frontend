import { FormProvider } from "react-hook-form";
import { Card } from "../../components/Card/Card";
import { useValidatedForm } from "../../components/forms";
import { registerSchema, RegisterSchemaType } from "./registerSchema";
import { RegisterForm } from "./components/RegisterForm";
import styles from "./Register.module.css";
import { Button } from "../../components/Button";
import { register } from "../../api/authApi";
import { upload } from "../../api/fileApi";
import { CreateUserDto } from "../../api/types";
import { Title } from "../../components/Title";

export const Register = () => {
  const form = useValidatedForm(registerSchema);

  const handleRegister = async (schema: RegisterSchemaType) => {
    const { image, ...user } = schema;
    const { newFileUrl } = await upload(image);
    const newUser: CreateUserDto = { ...user, imageUrl: newFileUrl };

    const response = await register(newUser);
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.registerCard}>
        <Title text="New Acoount"/>
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
