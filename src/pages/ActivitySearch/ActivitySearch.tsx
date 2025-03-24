import { LocationSearch } from "./components/LocationSearch";
import styles from "./ActivitySearch.module.css";
import { useValidatedForm } from "../../components/forms";
import {
  activitySearchSchema,
  ActivitySearchSchemaType,
} from "./ActivitySearchSchema";
import { FormProvider } from "react-hook-form";
import { TextAreaField } from "../../components/forms/TextAreaField";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card/Card";
import { getActivities, saveActivity } from "../../api/activityApi";
import { useState } from "react";
import { Activity, SavedActivityDto } from "../../api/types";
import { ActivityCard } from "./components/ActivityCard";
import { Title } from "../../components/Title";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { useUser } from "../../providers/UserProvider";
export const ActivitySearch = () => {
  const form = useValidatedForm(activitySearchSchema);
  const [displayedActivities, setDisplayedActivities] = useState<
    Activity[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(
    "Tell us what you are looking for...🔍"
  );
  const { user, setUser } = useUser();

  const handleSearchActivities = async (schema: ActivitySearchSchemaType) => {
    setIsLoading(true);
    try {
      const activities = await getActivities(
        schema.location,
        schema.description
      );
      setDisplayedActivities(activities);
      setResultMessage("No activity matches the criteria");
      setIsLoading(false);
    } catch {
      setResultMessage("Failed to fetch activities");
      setIsLoading(false);
    }
  };

  const handleSaveActivity = async (activity: Activity) => {
    try {
      const newActivity: SavedActivityDto = {
        ...activity,
        picture: activity.pictures?.[0],
      };
      const { newId } = await saveActivity(newActivity);
      newActivity._id = newId;
      setUser({
        ...user!,
        populatedActivities: [
          ...(user?.populatedActivities ?? []),
          newActivity,
        ],
      });
      toast.success("Activity saved successfully");
    } catch {
      toast.error("Failed to save activity");
    }
  };
  return (
    user && (
      <div className={styles.container}>
        <Card className={styles.locationSearchContainer}>
          <Title text="Explore Activities" />
          <FormProvider {...form}>
            <LocationSearch />
            <TextAreaField
              placeholder="Describe the desired activity"
              className={styles.textArea}
              name="description"
            />
          </FormProvider>
          <Button
            onClick={form.handleSubmit(handleSearchActivities)}
            className={styles.searchButton}
            text="Search"
          />
        </Card>
        <div className={styles.resultsContainer}>
          {isLoading ? (
            <div className={styles.loader}>
              <Loader width="120px" />
            </div>
          ) : (
            <div className={styles.activityGrid}>
              {displayedActivities?.map((activity) => (
                <ActivityCard
                  isAlreadySaved={
                    !!user.populatedActivities.find(
                      ({ id }) => id === activity.id
                    )
                  }
                  key={activity.id}
                  activity={activity}
                  onSave={handleSaveActivity}
                />
              ))}
            </div>
          )}
          {!displayedActivities?.length && !isLoading && (
            <div className={styles.resultMessage}>{resultMessage}</div>
          )}
        </div>
      </div>
    )
  );
};
