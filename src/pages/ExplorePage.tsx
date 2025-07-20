import React from "react";
import { useAppContext } from "../context/AppContext";
import PostGrid from "../components/Post/PostGrid";
import "./ExplorePage.css";

const ExplorePage: React.FC = () => {
  const { state } = useAppContext();

  // Filter posts for explore (could add more sophisticated logic later)
  const explorePosts = state.posts.filter((post) => post.isLiked === false);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore</h1>
        <p className="explore-subtitle">Discover new content and creators</p>
      </div>

      <div className="explore-content">
        {explorePosts.length > 0 ? (
          <PostGrid posts={explorePosts} />
        ) : (
          <div className="explore-empty">
            <h3>Nothing to explore yet</h3>
            <p>Check back later for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
