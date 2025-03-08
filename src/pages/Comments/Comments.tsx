import { FC, useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { addComment, getComments } from "../../api/commentApi";
import { Comment } from "../../api/types";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, useValidatedForm } from "../../components/forms";
import { commentSchema, CreateCommentSchemaType } from "./CommentsSchema";
import { FormProvider } from "react-hook-form";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { CommentRow } from "./components/Comment";
import { AxiosError } from "axios";
import { Card } from "../../components/Card/Card";
import { useUser } from "../../providers/UserProvider";

export const Comments: FC = () => {
  const form = useValidatedForm(commentSchema);
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [postNotFound, setPostNotFound] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await getComments(postId ?? "");
        setComments(commentsResponse.reverse());
      } catch (error) {
        if (error instanceof AxiosError && error.status === 404) {
          toast.error("Post not found");
          setPostNotFound(true);
        }
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleAddComment = async (schema: CreateCommentSchemaType) => {
    try {
      const response = await addComment({ ...schema, postId: postId! });
      setComments((prev) => [
        {
          _id: response.newId,
          content: schema.content,
          username: user!.username,
          imageUrl: user!.imageUrl,
        },
        ...prev,
      ]);
      toast.success("comment added successfully");
    } catch {
      toast.error("failed to add comment");
    }
  };

  return postNotFound ? (
    <Title text="Post not found" />
  ) : (
    <Card className={styles.commentsContainer}>
      <Title text="Comments" />
      <div className={styles.commentInputContainer}>
        <FormProvider {...form}>
          <div className={styles.commentInput}>
            <FormInput name="content" placeholder="Write a comment..." />
          </div>
        </FormProvider>
        <Button
          className={styles.commentButton}
          text="Add Comment"
          onClick={form.handleSubmit(handleAddComment)}
        />
      </div>
      <div className={styles.commentsList}>
        {comments.map(({ content, username, _id, imageUrl }) => (
          <CommentRow
            key={_id}
            content={content}
            username={username}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </Card>
  );
};
