import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import apiClient from "../../api/apiClient";


interface Comment {
  id: string;
  username: string;
  text: string;
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const newCommentObj = { username: "Current User", text: newComment };
      const response = await apiClient.post(`/comments/${postId}/add`, newCommentObj);
      setComments([...comments, response.data]);
      setNewComment("");

      if ((comments.length + 1) % commentsPerPage === 1) {
        setCurrentPage(Math.ceil((comments.length + 1) / commentsPerPage));
      }
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
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
        {currentComments.map((comment) => (
          <div key={comment.id} className={styles.commentCard}>
            <div className={styles.commentAvatar}></div>
            <div className={styles.commentContent}>
              <span className={styles.commentUsername}>{comment.username}</span>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button className={styles.pageButton} onClick={() => paginate(currentPage - 1)}>
              {currentPage - 1}
            </button>
          )}
          <button className={styles.pageButtonActive}>{currentPage}</button>
          {currentPage < totalPages && (
            <button className={styles.pageButton} onClick={() => paginate(currentPage + 1)}>
              {currentPage + 1}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
