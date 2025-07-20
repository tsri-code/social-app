import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import PostGrid from "../components/Post/PostGrid";
import { useApi } from "../hooks/useApi";
import "./FeedPage.css";

const FeedPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { getAppInfo } = useApi();

  useEffect(() => {
    const loadFeedData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const { user, posts } = await getAppInfo();
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_POSTS", payload: posts });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load feed data" });
        console.error("Error loading feed data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    if (state.posts.length === 0) {
      loadFeedData();
    }
  }, [dispatch, getAppInfo, state.posts.length]);

  if (state.loading) {
    return <div className="loading">Loading feed...</div>;
  }

  return (
    <div className="feed-page">
      <div className="feed-header">
        <h1 className="feed-title">Latest Posts</h1>
        <p className="feed-subtitle">
          Discover amazing content from our community
        </p>
      </div>
      <PostGrid posts={state.posts} />
    </div>
  );
};

export default FeedPage;
