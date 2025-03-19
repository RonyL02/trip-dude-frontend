import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useUser } from "../../providers/UserProvider";

export const Navbar = () => {
  const { user } = useUser();
  return (
    user && (
      <nav className={styles.navbar}>
        <div className={styles.navbarTitle}>
          <span className={styles.navbarIcon}>🌍</span>
          <span>Trip Dude</span>
        </div>
        <div className={styles.navbarLinks}>
          <Link to="/profile">Profile</Link>
          <Link to="/activities-search">Activities</Link>
          <Link to="/feed">Posts</Link>
        </div>
      </nav>
    )
  );
};
