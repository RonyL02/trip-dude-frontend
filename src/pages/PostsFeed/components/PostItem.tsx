import React from "react";
import styles from "./PostItem.module.css";
import LikeButton from "./LikeButton";
import CommentsButton from "./CommentsButton";

interface PostProps {
  post: {
    id: string;
    imageUrl: string;
    description: string;
    likes: number;
    activityType: string;
    commentsCount: number;
  };
}

const PostItem: React.FC<PostProps> = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <img src={post.imageUrl} alt="Post" className={styles.postImage} />
      <div className={styles.postContent}>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.postInfo}>
          <LikeButton postId={post.id} initialLikes={post.likes} />
          <div className={styles.activity}>
            {post.activityType} |
            <CommentsButton postId={post.id} commentsCount={post.commentsCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
