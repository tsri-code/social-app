import React from "react";
import { Post } from "../../context/AppContext";

interface PostPreviewProps {
  post: Post;
  onClose: () => void;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post, onClose }) => {
  return (
    <div className="modal__container modal__container_type_preview">
      <button
        className="modal__close-btn modal__close-btn_type_preview"
        type="button"
        onClick={onClose}
      >
        ×
      </button>
      <div className="modal__image-container">
        <img src={post.link} alt={post.name} className="modal__image" />
        <p className="modal__caption">{post.name}</p>
      </div>
    </div>
  );
};

export default PostPreview;
