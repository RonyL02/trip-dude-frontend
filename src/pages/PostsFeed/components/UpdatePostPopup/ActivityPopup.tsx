import Popup from "reactjs-popup";
import { FC, LegacyRef, useRef } from "react";
import { PopupActions } from "reactjs-popup/dist/types";
import { Post } from "../../../../api/types";
import { UpdatePost } from "../UpdatePost/UpdatePost";
import { FaWindowClose } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

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
      trigger={<MdModeEditOutline size={60} style={{ cursor: "pointer" }} />}
      modal
      closeOnEscape
      closeOnDocumentClick
      position={"center center"}
      ref={popupRef as unknown as LegacyRef<PopupActions>}
    >
      <FaWindowClose
        size={30}
        color="red"
        style={{ alignSelf: "center" }}
        onClick={() => popupRef.current?.close()}
      />
      <UpdatePost post={post} onAfterSave={closePopup} />
    </Popup>
  );
};
