import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useApi } from "../../hooks/useApi";

interface EditAvatarFormProps {
  onClose: () => void;
}

const EditAvatarForm: React.FC<EditAvatarFormProps> = ({ onClose }) => {
  const { dispatch } = useAppContext();
  const { setUserAvatar } = useApi();
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedUser = await setUserAvatar({ avatar });
      dispatch({ type: "SET_USER", payload: updatedUser });
      onClose();
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="modal__title">Edit profile avatar</h2>
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__label">
          Profile Picture
          <input
            type="url"
            className="modal__input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Paste the link to an image"
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

export default EditAvatarForm;
