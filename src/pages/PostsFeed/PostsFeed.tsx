import React, { useEffect, useState } from "react";
import styles from "./PostsFeed.module.css";
import apiClient from "../../api/apiClient";
import {PostItem } from "./components";


interface Post {
  id: string;
  imageUrl: string;
  description: string;
  likes: number;
  activityType: string;
  commentsCount: number;
}

const PostsFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.postsFeedContainer}>
      <h2 className={styles.title}>Posts Feed</h2>
      <div className={styles.postsList}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
