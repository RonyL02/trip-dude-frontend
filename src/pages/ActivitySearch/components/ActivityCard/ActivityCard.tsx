import { FC, useState } from "react";
import { Activity } from "../../../../api/types";
import styles from "./ActivityCard.module.css";
import { Button } from "../../../../components/Button";
import { useUser } from "../../../../providers/UserProvider";
import { ActivityPopup } from "../../../../components/ActivityPopup/ActivityPopup";
type Props = {
  activity: Activity;
  isAlreadySaved: boolean;
  onSave: (activity: Activity) => void;
};

export const ActivityCard: FC<Props> = ({ activity, onSave }) => {
  const [saved, setSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState(activity.pictures?.[0]);
  const { user } = useUser();
  const handleSave = () => {
    onSave(activity);
    setSaved(true);
  };

  return (
    <div className={styles.activityCard}>
      <img
        src={imgSrc ?? "/empty-300x240.jpg"}
        className={styles.activityImage}
        onError={() => setImgSrc("/empty-300x240.jpg")}
      />
      <h3>{activity.name}</h3>
      <h3>{activity.rating}</h3>
      <a
        href={activity.bookingLink}
        className={styles.visitLink}
        target="_blank"
      >
        {activity.bookingLink ? "Visit Website" : "Link not Available"}
      </a>
      <ActivityPopup activity={activity} />
      <Button
        text="Save"
        className={`${styles.saveButton} ${
          (saved ||
            user?.populatedActivities.find(
              ({id}) => id === activity.id
            )) &&
          styles.savedButton
        }`}
        disabled={
          !!(
            saved ||
            user?.populatedActivities.find(({id}) => id === activity.id)
          )
        }
        onClick={handleSave}
      />
    </div>
  );
};
