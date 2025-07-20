import React, { useState } from "react";
import { User } from "../../context/AppContext";
import Modal from "../Modal/Modal";
import EditProfileForm from "../Forms/EditProfileForm";
import EditAvatarForm from "../Forms/EditAvatarForm";
import NewPostForm from "../Forms/NewPostForm";
import "./Profile.css";
import editIcon from "../../assets/images/Group2.svg";
import addIcon from "../../assets/images/Group26.svg";
import editAvatarIcon from "../../assets/images/edit_avatar.png";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  return (
    <>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <button
              className="profile__avatar-button"
              type="button"
              onClick={() => setIsEditAvatarOpen(true)}
            >
              <img
                src={editAvatarIcon}
                alt="Edit profile icon"
                className="profile__avatar-edit-icon"
              />
            </button>
            <img
              src={user.avatar}
              alt={`Profile of ${user.name}`}
              className="profile__image"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__description">{user.about}</p>
            <button
              className="profile__edit-button"
              type="button"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <img
                src={editIcon}
                alt="Edit profile icon"
                className="profile__edit-icon"
              />
              Edit Profile
            </button>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => setIsNewPostOpen(true)}
        >
          <img
            src={addIcon}
            alt="Add new post icon"
            className="profile__add-icon"
          />
          New Post
        </button>
      </section>

      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      >
        <EditProfileForm
          user={user}
          onClose={() => setIsEditProfileOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditAvatarOpen}
        onClose={() => setIsEditAvatarOpen(false)}
      >
        <EditAvatarForm onClose={() => setIsEditAvatarOpen(false)} />
      </Modal>

      <Modal isOpen={isNewPostOpen} onClose={() => setIsNewPostOpen(false)}>
        <NewPostForm onClose={() => setIsNewPostOpen(false)} />
      </Modal>
    </>
  );
};

export default Profile;
