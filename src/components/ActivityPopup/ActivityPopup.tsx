import Popup from "reactjs-popup";
import { Button } from "../Button";
import { ActivityPage } from "../../pages/Activity";
import { FC, LegacyRef, useRef } from "react";
import { Activity } from "../../api/types";
import { PopupActions } from "reactjs-popup/dist/types";
import styles from "./ActivityPopup.module.css";
type Props = {
  activity: Activity;
};

export const ActivityPopup: FC<Props> = ({ activity }) => {
  const popupRef = useRef<PopupActions>();

  return (
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
          text="View Activity Details"
          className={`${styles.detailsButton}`}
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
        style={{ backgroundColor: "red", borderRadius: "100%" }}
        onClick={() => popupRef.current?.close()}
      />
      <ActivityPage activity={activity} />
    </Popup>
  );
};
