import { FormProvider } from "react-hook-form";
import { Card } from "../../../../components/Card/Card";
import { FormInput, useValidatedForm } from "../../../../components/forms";
import { ImageField } from "../../../../components/forms/ImageField";
import { UserDetailsSchema, userDetailsSchema } from "./userDetailsSchema";
import { Button } from "../../../../components/Button";
import { FC } from "react";
import { CreateUserDto, User } from "../../../../api/types";
import styles from "./UserDetails.module.css";
import { updateProfile } from "../../../../api/userApi";
import { upload } from "../../../../api/fileApi";
import { logout } from "../../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../providers/UserProvider";
type Props = {
  user: User;
};

export const UserDetails: FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const form = useValidatedForm(userDetailsSchema, {
    username: user.username,
    image: null,
  });
  const { setUser } = useUser();

  const handleUserUpdate = async (schema: UserDetailsSchema) => {
    const { image, ...user } = schema;
    let newFileUrl: string | undefined;
    if (image instanceof File) {
      newFileUrl = (await upload(image)).newFileUrl;
    }
    const updatedUser: Partial<CreateUserDto> = {
      ...user,
      ...(newFileUrl ? { imageUrl: newFileUrl } : {}),
    };

    await updateProfile(updatedUser);
    form.reset(form.getValues());
    toast.success("Profile Updated Successfully");
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("login");
  };

  const goToMyPosts = () => {
    navigate("my-posts");
  };

  return (
    <Card className={styles.userDetails}>
      <FormProvider {...form}>
        <ImageField
          name="image"
          defaultImgUrl={user?.imageUrl ?? "/default-avatar.png"}
        />
        <FormInput name="username" type="text" />
      </FormProvider>
      <Button
        text="Update"
        disabled={
          Object.values(form.formState.touchedFields).filter(Boolean).length ===
          0
        }
        onClick={form.handleSubmit(handleUserUpdate)}
      />
      <Button text="My Posts" onClick={goToMyPosts} />
      <Button
        text="Logout"
        className={styles.logoutButton}
        onClick={handleLogout}
      />
    </Card>
  );
};
