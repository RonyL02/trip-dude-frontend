import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import styles from "./Login.module.css";
import { login, loginWithGoogle } from "../../api/authApi";
import { LoginForm } from "./components/LoginForm";
import { useValidatedForm } from "../../components/forms";
import { loginSchema, LoginSchemaType } from "./loginSchema";
import { FormProvider } from "react-hook-form";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { useUser } from "../../providers/UserProvider";

export const Login = () => {
  const form = useValidatedForm(loginSchema);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const user = await loginWithGoogle(credentialResponse?.credential ?? "");
    setUser(user);
  };

  const handleLogin = async (schema: LoginSchemaType) => {
    const user = await login(schema.email, schema.password);
    setUser(user);
  };

  return (
    <div className={styles.container}>
      <Card>
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
        <Button
          className={styles.register}
          onClick={() => navigate("/register")}
          text="No account yet?"
        />
      </Card>
    </div>
  );
};
