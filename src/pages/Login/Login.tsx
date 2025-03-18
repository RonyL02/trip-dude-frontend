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
import { toast } from "react-toastify";
import { Title } from "../../components/Title";
import { getProfile } from "../../api/userApi";
import { getSavedActivities } from "../../api/activityApi";

export const Login = () => {
  const form = useValidatedForm(loginSchema);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      await loginWithGoogle(credentialResponse?.credential ?? "");
      const user = await getProfile();
      const activities = await getSavedActivities();

      setUser({
        ...user,
        populatedActivities: activities,
      });
      setUser(user);
      navigate("/profile");
    } catch {
      toast.error("Failed to login with Google");
    }
  };

  const handleLogin = async (schema: LoginSchemaType) => {
    try {
      await login(schema.email, schema.password);
      const user = await getProfile();
      const activities = await getSavedActivities();

      setUser({
        ...user,
        populatedActivities: activities,
      });
      setUser(user);
      navigate("/profile");
    } catch {
      toast.error("Invalid credentials or user does not exist");
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title text="Welcome to TripDude" />
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
