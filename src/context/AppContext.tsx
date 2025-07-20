import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Types
export interface User {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface Post {
  _id: string;
  name: string;
  link: string;
  isLiked: boolean;
  owner: User;
}

interface AppState {
  user: User | null;
  posts: Post[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: Post }
  | { type: "DELETE_POST"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: AppState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};

// App reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
