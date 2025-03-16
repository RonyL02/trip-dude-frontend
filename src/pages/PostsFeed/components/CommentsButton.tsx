import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { getComments } from "../../../api/commentApi";

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
    <Button onClick={() => navigate(`/comments/${postId}`)} text={`Comments | ${commentsCount}`} />
  );
};

export default CommentsButton;
