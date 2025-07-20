import React from "react";
import { Post } from "../../context/AppContext";
import PostCard from "./PostCard";
import "./PostGrid.css";

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <section className="gallery">
      <ul className="gallery__cards">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default PostGrid;
