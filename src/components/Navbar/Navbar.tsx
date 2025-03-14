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
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/posts">Posts</Link>
        </div>
      </nav>
    )
  );
};
