import { FC } from "react";
import styles from "./Comment.module.css";
type Props = {
  username: string;
  imageUrl?: string;
  content: string;
};

export const CommentRow: FC<Props> = ({ content, imageUrl, username }) => {
  return (
    <div className={styles.commentCard}>
      <img
        className={styles.commentAvatar}
        src={imageUrl ?? "/default-avatar.png"}
        loading="lazy"
      />
      <div className={styles.commentContent}>
        <span className={styles.commentUsername}>{username}</span>
        <p className={styles.commentText}>{content}</p>
      </div>
    </div>
  );
};
