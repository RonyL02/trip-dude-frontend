import Popup from "reactjs-popup";
import { FC, LegacyRef, useRef } from "react";
import { PopupActions } from "reactjs-popup/dist/types";
import styles from "./ActivityPopup.module.css";
import { Post } from "../../../../api/types";
import { Button } from "../../../../components/Button";
import { UpdatePost } from "../UpdatePost/UpdatePost";
type Props = {
  post: Post;
  onAfterSave: (post: Post) => void;
};

export const UpdatePostPopup: FC<Props> = ({ post, onAfterSave }) => {
  const popupRef = useRef<PopupActions>();

  const closePopup = (post: Post) => {
    onAfterSave(post);
    popupRef.current?.close();
  };
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
      trigger={<Button text="Edit" className={`${styles.detailsButton}`} />}
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
      <UpdatePost post={post} onAfterSave={closePopup} />
    </Popup>
  );
};
