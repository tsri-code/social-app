import React from "react";
import { useAppContext } from "../context/AppContext";
import Profile from "../components/Profile/Profile";
import PostGrid from "../components/Post/PostGrid";

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();

  if (!state.user) {
    return <div>Please log in to view your profile</div>;
  }

  // Filter posts by current user
  const userPosts = state.posts.filter(
    (post) => post.owner._id === state.user!._id
  );

  return (
    <div className="profile-page">
      <Profile user={state.user} />
      <PostGrid posts={userPosts} />
    </div>
  );
};

export default ProfilePage;
