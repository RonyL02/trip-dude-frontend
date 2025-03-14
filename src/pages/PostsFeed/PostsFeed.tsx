import React, { useEffect, useState } from "react";
import styles from "./PostsFeed.module.css";
import { PostItem } from "./components";
import { getPosts } from "../../api/postApi";
import { toast } from "react-toastify";
import { Title } from "../../components/Title";
import { Post } from "../../api/types";

const PostsFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await getPosts();
        setPosts(postsResult);
      } catch {
        toast.error("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.postsFeedContainer}>
      <Title text="Posts" />
      <div className={styles.postsList}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
