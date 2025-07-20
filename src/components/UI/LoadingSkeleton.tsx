import React from "react";
import "./LoadingSkeleton.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

export const PostSkeleton: React.FC = () => {
  return (
    <div className="post-skeleton">
      <Skeleton
        height="300px"
        borderRadius="8px"
        className="post-skeleton__image"
      />
      <div className="post-skeleton__content">
        <div className="post-skeleton__actions">
          <Skeleton width="24px" height="24px" borderRadius="50%" />
          <Skeleton width="24px" height="24px" borderRadius="50%" />
        </div>
        <Skeleton height="16px" width="60%" className="post-skeleton__title" />
      </div>
    </div>
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="profile-skeleton">
      <div className="profile-skeleton__header">
        <Skeleton
          width="80px"
          height="80px"
          borderRadius="50%"
          className="profile-skeleton__avatar"
        />
        <div className="profile-skeleton__info">
          <Skeleton
            height="24px"
            width="150px"
            className="profile-skeleton__name"
          />
          <Skeleton
            height="16px"
            width="100px"
            className="profile-skeleton__description"
          />
          <Skeleton
            height="36px"
            width="120px"
            borderRadius="8px"
            className="profile-skeleton__button"
          />
        </div>
      </div>
    </div>
  );
};

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};
