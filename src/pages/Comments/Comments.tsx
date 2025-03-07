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
      <h2>Comments</h2>
      <div className={styles.commentInputContainer}>
        <input
          className={styles.commentInput}
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className={styles.commentCard}>
            <span className={styles.commentText}>
              <strong>{comment.username}:</strong> {comment.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
