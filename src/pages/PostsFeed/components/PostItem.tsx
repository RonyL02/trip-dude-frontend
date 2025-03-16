import React, { useEffect, useState } from "react";
import styles from "./PostItem.module.css";
import CommentsButton from "./CommentsButton";
import { Activity, Post, User } from "../../../api/types";
import { Card } from "../../../components/Card/Card";
import { LikeButton } from "./LikeButton";
import { UpdatePostPopup } from "./UpdatePostPopup/ActivityPopup";
import { getUserById } from "../../../api/userApi";
import { ActivityPopup } from "../../../components/ActivityPopup/ActivityPopup";
import { getActivityById } from "../../../api/activityApi";

interface PostProps {
  post: Post;
  isMyPosts?: boolean;
}

export const PostItem: React.FC<PostProps> = ({ post, isMyPosts = false }) => {
  const [displayedPost, setDisplayedPost] = useState(post);
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    displayedPost.imageUrl
  );
  const [activity, setActivity] = useState<Activity>();
  const [uploader, setUploader] = useState<User | undefined>();

  useEffect(() => {
    const getAvatar = async () => {
      const user = await getUserById(post.userId);
      setUploader(user);
    };

    const getActivity = async () => {
      const res = await getActivityById(post.activityId);
      setActivity(res);
    };

    getAvatar();
    getActivity();
  }, [post]);

  const handleAfterUpdate = (updatedPost: Post) => {
    setDisplayedPost(updatedPost);
    if (updatedPost.imageUrl) {
      setImgSrc(updatedPost.imageUrl);
    }
  };

  return (
    <Card className={styles.postCard}>
      {!isMyPosts && (
        <div className={styles.uploader}>
          <img
            src={uploader?.imageUrl ?? "/default-avatar.png"}
            className={styles.avatar}
          />
          <div>{uploader?.username}</div>
        </div>
      )}
      <img
        src={imgSrc ?? "/empty-300x240.jpg"}
        className={styles.postImage}
        onError={() => setImgSrc("/empty-300x240.jpg")}
      />
      <div className={styles.postContent}>
        <p className={styles.description}>{displayedPost.description}</p>
        <div className={styles.postInfo}>
          <LikeButton
            postId={displayedPost._id}
            initialLikes={displayedPost.likes}
          />
          {isMyPosts && (
            <UpdatePostPopup
              post={displayedPost}
              onAfterSave={handleAfterUpdate}
            />
          )}
          <div>{activity && <ActivityPopup activity={activity} />}</div>

          <div className={styles.activity}>
            <CommentsButton postId={displayedPost._id} />
          </div>
        </div>
      </div>
    </Card>
  );
};
