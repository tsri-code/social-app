import { useCallback } from "react";
import { User, Post } from "../context/AppContext";
import avatarImage from "../assets/images/avatar.jpg";

const API_BASE_URL = "https://around-api.en.tripleten-services.com/v1";
const API_HEADERS = {
  authorization: "a02b3a56-2aeb-4c2c-8ac4-78ecf247f130",
  "Content-Type": "application/json",
};

const handleResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error: ${response.status}`);
};

export const useApi = () => {
  const getAppInfo = useCallback(async (): Promise<{
    user: User;
    posts: Post[];
  }> => {
    const [posts, user] = await Promise.all([
      fetch(`${API_BASE_URL}/cards`, { headers: API_HEADERS }).then(
        handleResponse
      ),
      fetch(`${API_BASE_URL}/users/me`, { headers: API_HEADERS }).then(
        handleResponse
      ),
    ]);

    // Fix SSL certificate issues by using local avatar
    const fixedUser = {
      ...user,
      name: user.name === "First Name" ? "Bessie Coleman" : user.name,
      about: user.about === "Last Name" ? "Civil Aviator" : user.about,
      avatar: avatarImage,
    };

    return { user: fixedUser, posts };
  }, []);

  const getUserInfo = useCallback(async (): Promise<User> => {
    return fetch(`${API_BASE_URL}/users/me`, { headers: API_HEADERS }).then(
      handleResponse
    );
  }, []);

  const editUserInfo = useCallback(
    async ({ name, about }: { name: string; about: string }): Promise<User> => {
      return fetch(`${API_BASE_URL}/users/me`, {
        method: "PATCH",
        headers: API_HEADERS,
        body: JSON.stringify({ name, about }),
      }).then(handleResponse);
    },
    []
  );

  const setUserAvatar = useCallback(
    async ({ avatar }: { avatar: string }): Promise<User> => {
      return fetch(`${API_BASE_URL}/users/me/avatar`, {
        method: "PATCH",
        headers: API_HEADERS,
        body: JSON.stringify({ avatar }),
      }).then(handleResponse);
    },
    []
  );

  const addCard = useCallback(
    async ({ name, link }: { name: string; link: string }): Promise<Post> => {
      return fetch(`${API_BASE_URL}/cards`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ name, link }),
      }).then(handleResponse);
    },
    []
  );

  const deleteCard = useCallback(async (cardId: string): Promise<void> => {
    return fetch(`${API_BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
      headers: API_HEADERS,
    }).then(handleResponse);
  }, []);

  const changeLikeStatus = useCallback(
    async (cardId: string, isLiked: boolean): Promise<Post> => {
      const method = isLiked ? "DELETE" : "PUT";
      return fetch(`${API_BASE_URL}/cards/${cardId}/likes`, {
        method,
        headers: API_HEADERS,
      }).then(handleResponse);
    },
    []
  );

  return {
    getAppInfo,
    getUserInfo,
    editUserInfo,
    setUserAvatar,
    addCard,
    deleteCard,
    changeLikeStatus,
  };
};
