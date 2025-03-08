import React, { useState } from "react";
import styles from "./Comments.module.css";

interface Comment {
  username: string;
  text: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj: Comment = { username: "Current User", text: newComment };
    setComments(prevComments => [...prevComments, newCommentObj]);
    setNewComment("");

    if ((comments.length + 1) % commentsPerPage === 1) {
      setCurrentPage(Math.ceil((comments.length + 1) / commentsPerPage));
    }
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        {currentComments.map((comment, index) => (
          <div key={index} className={styles.commentCard}>
            <div className={styles.commentAvatar}></div>
            <div className={styles.commentContent}>
              <span className={styles.commentUsername}>{comment.username}</span>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      {comments.length > commentsPerPage && (
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, i) => (
            <button key={i} className={styles.pageButton} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
