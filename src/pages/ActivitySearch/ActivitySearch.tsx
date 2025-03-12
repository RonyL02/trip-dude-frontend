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
import { Activity } from "../../api/types";
import { ActivityCard } from "./components/ActivityCard";
import { Title } from "../../components/Title";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
export const ActivitySearch = () => {
  const form = useValidatedForm(activitySearchSchema);
  const [displayedActivities, setDisplayedActivities] = useState<
    Activity[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearchActivities = async (schema: ActivitySearchSchemaType) => {
    setIsLoading(true);
    const activities = await getActivities(schema.location, schema.description);
    setDisplayedActivities(activities);
    toast.success(activities.length);
    setIsLoading(false);
  };

  const handleSaveActivity = async (activity: Activity) => {
    try {
      await saveActivity({ ...activity, picture: activity.pictures?.[0] });
      toast.success("Activity saved successfully");
    } catch {
      toast.error("Failed to save activity");
    }
  };
  return (
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
              <ActivityCard activity={activity} onSave={handleSaveActivity} />
            ))}
          </div>
        )}
        {!displayedActivities?.length && !isLoading && (
          <div className={styles.resultMessage}>
            No activity matches the criteria
          </div>
        )}
      </div>
    </div>
  );
};
