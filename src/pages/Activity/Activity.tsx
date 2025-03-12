import { useEffect, useState } from "react";
import styles from "./Activity.module.css";
import { getActivityById } from "../../api/activityApi";
import { useParams } from "react-router-dom";
import { SavedActivityDto } from "../../api/types";
import { toast } from "react-toastify";
import { Title } from "../../components/Title";
import { Card } from "../../components/Card/Card";

export const ActivityPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [activity, setActivity] = useState<SavedActivityDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | undefined>();

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activity = await getActivityById(activityId!);
        if (activity) {
          setImgSrc(activity.picture);
          setActivity(activity);
        } else {
          toast.warn("⚠️ No activities found.");
        }
      } catch {
        toast.error("❌ Error fetching activity:");
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [activityId]);

  if (loading) {
    return <p className={styles.loading}>Loading activity...</p>;
  }

  if (!activity) {
    return <p className={styles.error}>❌ No activity found.</p>;
  }

  return (
    <Card className={styles.overlay}>
      <div>
        <Title text={`${activity.name}`} />
        <img
          src={imgSrc ?? "/empty-300x240.jpg"}
          className={styles.image}
          onError={() => setImgSrc("/empty-300x240.jpg")}
        />
        <p className={styles.details}>
          {activity.rating ? `${activity.rating}⭐` : ""}
          {activity.price?.amount && activity.price.currencyCode
            ? `| ${activity.price?.amount}${activity.price.currencyCode}`
            : ""}
        </p>
        <a
          href={activity.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookingLink}
        >
          {activity.bookingLink ? "Book Now" : "Link notAvailable"}
        </a>
      </div>
      <div>
        <p className={styles.description}>{activity.shortDescription}</p>
        <p className={styles.description}>{activity.description}</p>
      </div>
    </Card>
  );
};
