import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useApi } from "../../hooks/useApi";

interface NewPostFormProps {
  onClose: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onClose }) => {
  const { dispatch } = useAppContext();
  const { addCard } = useApi();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPost = await addCard({ name, link });
      dispatch({ type: "ADD_POST", payload: newPost });
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="modal__title">New Post</h2>
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__label">
          Image Link
          <input
            type="url"
            className="modal__input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste a link to the picture"
            required
          />
        </label>
        <label className="modal__label">
          Caption
          <input
            type="text"
            className="modal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={30}
            placeholder="Type your caption"
            required
          />
        </label>
        <button
          className="modal__submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
