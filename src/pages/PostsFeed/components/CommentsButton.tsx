import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";

interface CommentsButtonProps {
  postId: string;
}

const CommentsButton: React.FC<CommentsButtonProps> = ({
  postId,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`/comments/${postId}`)}
      text="Comments"
    />
  );
};

export default CommentsButton;
