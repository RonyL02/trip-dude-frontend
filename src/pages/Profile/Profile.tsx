import { useUser } from "../../providers/UserProvider";
import { ActivitiesList } from "./components/ActivitiesList";
import { UserDetails } from "./components/UserDetails";
import styles from "./Profile.module.css";
export const Profile = () => {
  const { user } = useUser();

  return (
    user && (
      <div className={styles.profileContainer}>
        <UserDetails user={user} />
        <ActivitiesList activities={user.populatedActivities} />
      </div>
    )
  );
};
