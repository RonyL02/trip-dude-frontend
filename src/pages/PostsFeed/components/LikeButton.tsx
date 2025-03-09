import React, { useState } from "react";
import styles from "./LikeButton.module.css";
import { FaHeart } from "react-icons/fa";
import apiClient from "../../../api/apiClient";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;

    try {
      await apiClient.post(`/posts/${postId}/like`);
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  return (
    <button className={styles.likeButton} onClick={handleLike} disabled={liked}>
      <FaHeart className={liked ? styles.liked : styles.notLiked} /> {likes}
    </button>
  );
};

export default LikeButton;
