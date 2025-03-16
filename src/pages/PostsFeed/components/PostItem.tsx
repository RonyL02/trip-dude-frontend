import React, { useState } from "react";
import styles from "./PostItem.module.css";
import CommentsButton from "./CommentsButton";
import { Post } from "../../../api/types";
import { Card } from "../../../components/Card/Card";
import { LikeButton } from "./LikeButton";
import { UpdatePostPopup } from "./UpdatePostPopup/ActivityPopup";

interface PostProps {
  post: Post;
  isMyPosts?: boolean;
}

export const PostItem: React.FC<PostProps> = ({ post, isMyPosts = false }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(post.imageUrl);

  return (
    <Card className={styles.postCard}>
      <img
        src={imgSrc ?? "/empty-300x240.jpg"}
        className={styles.postImage}
        onError={() => setImgSrc("/empty-300x240.jpg")}
      />
      <div className={styles.postContent}>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.postInfo}>
          <LikeButton postId={post._id} initialLikes={post.likes} />
          {isMyPosts && <UpdatePostPopup post={post} />}
          <div className={styles.activity}>
            <CommentsButton postId={post._id} />
          </div>
        </div>
      </div>
    </Card>
  );
};
