import { FC, useState } from "react";
import { Card } from "../../../../components/Card/Card";
import { SavedActivityDto } from "../../../../api/types";
import { Title } from "../../../../components/Title";
import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import styles from "./ActivitiesList.module.css";
import { deleteSavedActivity } from "../../../../api/activityApi";
import { toast } from "react-toastify";
import { ActivityPopup } from "../../../../components/ActivityPopup/ActivityPopup";
type Props = {
  activities: SavedActivityDto[];
};

export const ActivitiesList: FC<Props> = ({ activities }) => {
  const [displayedActivities, setDisplayedActivities] = useState(activities);
  const navigate = useNavigate();

  const handleUnsave = async (id: string) => {
    await deleteSavedActivity(id);
    setDisplayedActivities((prev) => prev.filter(({ _id }) => _id !== id));
    toast.success("Activity was removed");
  };

  const handleGoToCreatePost = (id: string) => {
    navigate(`/create-post/${id}`);
  };
  return (
    <div className={styles.activitiesContainer}>
      <Title text="My Saved Activities" style={{ color: "white" }} />
      <div className={styles.activitiesList}>
        {displayedActivities && displayedActivities.length > 0 ? (
          displayedActivities.map((activity) => (
            <Card className={styles.activ} key={activity.id}>
              <h3>{activity.name}</h3>
              <div className={styles.buttonList}>
                <Button
                  style={{ backgroundColor: "lightgreen" }}
                  text="Post"
                  onClick={() => handleGoToCreatePost(activity._id!)}
                />
                <div>
                  <ActivityPopup
                    activity={{
                      ...activity,
                      pictures: [activity?.picture ?? "/empty-300x240.jpg"],
                    }}
                  />
                </div>
                <Button
                  style={{ backgroundColor: "red" }}
                  text="Unsave"
                  onClick={() =>
                    handleUnsave(activity._id ?? "/empty-300x240.jpg")
                  }
                />
              </div>
            </Card>
          ))
        ) : (
          <Title text="No Activities Saved Yet" />
        )}
      </div>
      <Button
        className={styles.searchActivitieButton}
        text="Search For Activities🔍"
        onClick={() => navigate("/activities-search")}
      />
    </div>
  );
};
