import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import styles from "./Login.module.css";
import { login, loginWithGoogle } from "../../api/authApi";
import { LoginForm } from "./components/LoginForm";
import { useValidatedForm } from "../../components/forms";
import { loginSchema, LoginSchemaType } from "./loginSchema";
import { FormProvider } from "react-hook-form";
import { Button } from "../../components/Button";

export const Login = () => {
  const form = useValidatedForm(loginSchema);

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const res = await loginWithGoogle(credentialResponse?.credential ?? "");
    console.log(res);
  };

  const handleLogin = async (schema: LoginSchemaType) => {
    const res = await login(schema.email, schema.password);
    console.log(res);
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome to TripDude</h1>
        <FormProvider {...form}>
          <LoginForm />
        </FormProvider>
        <Button
          text="Login"
          className={styles.loginButton}
          onClick={form.handleSubmit(handleLogin)}
        />
        <div className={styles.googleSignInButton}>
          <GoogleLogin shape="pill" onSuccess={handleGoogleLoginSuccess} />
        </div>
      </div>
    </div>
  );
};
