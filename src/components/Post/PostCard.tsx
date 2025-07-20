import React, { useState } from "react";
import { Post } from "../../context/AppContext";
import { useAppContext } from "../../context/AppContext";
import { useApi } from "../../hooks/useApi";
import Modal from "../Modal/Modal";
import PostPreview from "./PostPreview";
import "./PostCard.css";
import deleteIcon from "../../assets/images/delete_default.png";
import heartIcon from "../../assets/images/heart.svg";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { dispatch } = useAppContext();
  const { changeLikeStatus, deleteCard } = useApi();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLike = async () => {
    try {
      const updatedPost = await changeLikeStatus(post._id, post.isLiked);
      dispatch({ type: "UPDATE_POST", payload: updatedPost });
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      try {
        await deleteCard(post._id);
        dispatch({ type: "DELETE_POST", payload: post._id });
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <li className="card">
        <img
          src={post.link}
          alt={post.name}
          className="card__image"
          onClick={() => setIsPreviewOpen(true)}
        />
        <button
          className="card__delete-button"
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <img
            src={deleteIcon}
            alt="Delete card"
            className="card__delete-icon"
          />
        </button>
        <div className="card__description">
          <h2 className="card__title">{post.name}</h2>
          <button
            className={`card__like-button ${
              post.isLiked ? "card__like-button_active" : ""
            }`}
            type="button"
            onClick={handleLike}
          >
            <img
              src={heartIcon}
              alt="Like button"
              className="card__like-icon"
              width="22"
              height="20"
            />
          </button>
        </div>
      </li>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <PostPreview post={post} onClose={() => setIsPreviewOpen(false)} />
      </Modal>
    </>
  );
};

export default PostCard;
