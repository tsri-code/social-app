import React, { useState } from "react";
import { User } from "../../context/AppContext";
import { useAppContext } from "../../context/AppContext";
import { useApi } from "../../hooks/useApi";

interface EditProfileFormProps {
  user: User;
  onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onClose }) => {
  const { dispatch } = useAppContext();
  const { editUserInfo } = useApi();
  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedUser = await editUserInfo({ name, about });
      dispatch({ type: "SET_USER", payload: updatedUser });
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="modal__title">Edit profile</h2>
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={40}
            placeholder="Type your name"
            required
          />
        </label>
        <label className="modal__label">
          Description
          <input
            type="text"
            className="modal__input"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            minLength={2}
            maxLength={200}
            placeholder="Describe yourself"
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

export default EditProfileForm;
