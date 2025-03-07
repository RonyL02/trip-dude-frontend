import { useEffect, useState } from "react";
import styles from "./Activity.module.css";
import { fetchActivities } from "../../api/authApi";

interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string | number;
  price: string | number;
  bookingLink: string;
}

export const Activity = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activities = await fetchActivities();
        if (activities.length > 0) {
          setActivity(activities[0]); 
        } else {
          console.warn("⚠️ No activities found.");
        }
      } catch (error) {
        console.error("❌ Error fetching activity:", error);
      } finally {
        setLoading(false); 
      }
    };
    loadActivity();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading activity...</p>;
  }

  if (!activity) {
    return <p className={styles.error}>❌ No activity found.</p>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.activityCard}>
        <button className={styles.closeButton} onClick={() => setActivity(null)}>Close</button>
        <h2 className={styles.activityTitle}>{activity.name}</h2>
        <img src={activity.image} alt={activity.name} className={styles.image} />
        <p className={styles.description}>{activity.description}</p>
        <p className={styles.details}>
          ⭐ {activity.rating} | 💰 {activity.price} USD
        </p>
        <a
          href={activity.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookingLink}
        >
          Book Now
        </a>
      </div>
    </div>
  );
};
