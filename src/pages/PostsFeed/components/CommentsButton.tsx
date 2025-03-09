import React from "react";
import styles from "./CommentsButton.module.css";
import { useNavigate } from "react-router-dom";

interface CommentsButtonProps {
  postId: string;
  commentsCount: number;
}

const CommentsButton: React.FC<CommentsButtonProps> = ({ postId, commentsCount }) => {
  const navigate = useNavigate();

  return (
    <button className={styles.commentsButton} onClick={() => navigate(`/comments/${postId}`)}>
      Comments {commentsCount}
    </button>
  );
};

export default CommentsButton;
