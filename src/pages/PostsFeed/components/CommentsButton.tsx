import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComments } from "../../../api/commentApi";
import { FaCommentAlt } from "react-icons/fa";
import { Title } from "../../../components/Title";

interface CommentsButtonProps {
  postId: string;
}

const CommentsButton: React.FC<CommentsButtonProps> = ({ postId }) => {
  const navigate = useNavigate();
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    getComments(postId).then((res) => setCommentsCount(res?.length ?? 0));
  }, [postId]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
        cursor: "pointer",
        alignItems: "center",
      }}
    >
      <FaCommentAlt
        style={{ cursor: "pointer" }}
        size={40}
        onClick={() => navigate(`/comments/${postId}`)}
      />
      <Title text={commentsCount.toString()} />
    </div>
  );
};

export default CommentsButton;
