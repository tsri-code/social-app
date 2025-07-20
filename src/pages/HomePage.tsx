import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Profile from "../components/Profile/Profile";
import PostGrid from "../components/Post/PostGrid";
import { useApi } from "../hooks/useApi";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { getAppInfo } = useApi();

  useEffect(() => {
    const loadAppData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const { user, posts } = await getAppInfo();
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_POSTS", payload: posts });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load app data" });
        console.error("Error loading app data:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadAppData();
  }, [dispatch, getAppInfo]);

  if (state.loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      {state.user && <Profile user={state.user} />}
      <PostGrid posts={state.posts} />
    </div>
  );
};

export default HomePage;
