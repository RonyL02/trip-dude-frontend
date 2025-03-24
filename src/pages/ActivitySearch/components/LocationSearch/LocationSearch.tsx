import { useState, useEffect, FC } from "react";
import { getLocations } from "../../../../api/activityApi";
import styles from "./LocationSearch.module.css";
import { useFormContext } from "react-hook-form";

export const LocationSearch: FC = () => {
  const { register, setValue } = useFormContext();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [chosen, setChosen] = useState(false);
  useEffect(() => {
    if (query.length < 2 || chosen) {
      setSuggestions([]);
      return;
    }

    setChosen(false);
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const suggestions = await getLocations(query);

        setSuggestions(suggestions ?? []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query, chosen]);

  useEffect(() => {
    if (chosen) {
      setSuggestions([]);
      setLoading(false);
    }
  }, [chosen]);

  const handleInputChange = (input: string) => {
    setQuery(input);
    setValue("location", input);
    setChosen(false);
  };

  return (
    <div className={styles.autocompleteContainer}>
      <input
        autoComplete="off"
        type="text"
        placeholder="Enter your desired location"
        value={query}
        {...register("location")}
        onChange={(e) => handleInputChange(e.target.value)}
        className={styles.autocompleteInput}
      />
      {loading && !chosen ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        suggestions.length > 0 &&
        !chosen && (
          <div className={styles.autocompleteDropdown}>
            {suggestions.map((suggestion, index) => (
              <div
                className={styles.location}
                key={index}
                onClick={() => {
                  setChosen(true);
                  setQuery(suggestion);
                  setValue("location", suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
