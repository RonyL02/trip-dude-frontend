import React, { useEffect, useMemo, useState } from "react";
import styles from "./PostsFeed.module.css";
import { PostItem } from "./components";
import { deletePost, getPosts } from "../../api/postApi";
import { toast } from "react-toastify";
import { Title } from "../../components/Title";
import { Post } from "../../api/types";
import { useLocation } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";

const PostsFeed: React.FC = () => {
  const { pathname } = useLocation();

  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();

  const isMyPosts = useMemo(() => {
    return pathname.includes("my-posts");
  }, [pathname]);
  useEffect(() => {
    const fetchPosts = async (query?: Partial<Post>) => {
      try {
        const postsResult = await getPosts(query);
        setPosts(postsResult);
      } catch {
        toast.error("Failed to fetch posts");
      }
    };

    if (isMyPosts) {
      if (user) {
        fetchPosts({ userId: user!._id });
      }
    } else {
      fetchPosts();
    }
  }, [user, isMyPosts]);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter(({ _id }) => _id !== id));
      toast.success("Post was deleted successfully");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className={styles.postsFeedContainer}>
      <Title text={isMyPosts ? "My Posts" : "Posts"} />
      <div className={styles.postsList}>
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            isMyPosts={isMyPosts}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
