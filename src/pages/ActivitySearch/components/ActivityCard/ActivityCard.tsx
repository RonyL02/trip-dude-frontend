import { FC, LegacyRef, useRef, useState } from "react";
import { Activity } from "../../../../api/types";
import styles from "./ActivityCard.module.css";
import { Button } from "../../../../components/Button";
import Popup from "reactjs-popup";
import { ActivityPage } from "../../../Activity/Activity";
import { PopupActions } from "reactjs-popup/dist/types";
type Props = { activity: Activity; onSave: (activity: Activity) => void };

export const ActivityCard: FC<Props> = ({ activity, onSave }) => {
  const [saved, setSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState(activity.pictures?.[0]);
  const popupRef = useRef<PopupActions>();
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
      <Popup
        lockScroll
        contentStyle={{
          height: "70%",
          overflowX: "auto",
          padding: 40,
          borderRadius: 10,
          scrollbarWidth: "none",
        }}
        trigger={
          <Button
            text="View Full Details"
            className={`${styles.saveButton} ${saved && styles.savedButton}`}
          />
        }
        modal
        closeOnEscape
        closeOnDocumentClick
        position={"center center"}
        ref={popupRef as unknown as LegacyRef<PopupActions>}
      >
        <Button
          text="X"
          disabled={saved}
          onClick={() => popupRef.current?.close()}
        />
        <ActivityPage activity={activity} />
      </Popup>
      <Button
        text="Save"
        className={`${styles.saveButton} ${saved && styles.savedButton}`}
        disabled={saved}
        onClick={handleSave}
      />
    </div>
  );
};
