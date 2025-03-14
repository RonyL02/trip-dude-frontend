import { FC, useEffect, useState } from "react";
import styles from "./LikeButton.module.css";
import { FaHeart } from "react-icons/fa";
import { likePost } from "../../../api/postApi";
import { useUser } from "../../../providers/UserProvider";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export const LikeButton: FC<LikeButtonProps> = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLiked(!!user?.likedPosts.find((likedPostId) => likedPostId === postId));
  }, [user, postId]);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  return (
    <button className={styles.likeButton} onClick={handleLike}>
      <FaHeart className={liked ? styles.liked : styles.notLiked} /> {likes}
    </button>
  );
};
