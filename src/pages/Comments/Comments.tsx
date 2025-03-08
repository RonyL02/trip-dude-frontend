import React, { useState } from "react";
import styles from "./Comments.module.css";

interface Comment {
  username: string;
  text: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj: Comment = { username: "Current User", text: newComment };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.commentsTitle}>Comments</h2>
      <div className={styles.commentInputContainer}>
        <input
          className={styles.commentInput}
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className={styles.commentButton} onClick={handleAddComment}>Add Comment</button>
      </div>
      <div className={styles.commentsList}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.commentCard}>
            <div className={styles.commentAvatar}></div>
            <div className={styles.commentContent}>
              <span className={styles.commentUsername}>{comment.username}</span>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
