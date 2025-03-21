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
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const form = useValidatedForm(registerSchema);
  const navigate = useNavigate();

  const handleRegister = async (schema: RegisterSchemaType) => {
    const { image, ...user } = schema;

    try {
      let newFileUrl: string | undefined;
      if (image instanceof File) {
        newFileUrl = (await upload(image)).newFileUrl;
      }

      const newUser: CreateUserDto = {
        ...user,
        ...(newFileUrl ? { imageUrl: newFileUrl } : {}),
      };

      await register(newUser);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && error.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Failed to create user");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.registerCard}>
        <Title text="New Acoount" />
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
