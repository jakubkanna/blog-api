import { useState } from "react";
import usePermissions from "../lib/usePermissions";
import { formatTimestamp } from "../lib/helpers";

export default function Comment({ comment, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentData, setCommentData] = useState(comment);
  const { isAdmin, isAuthor } = usePermissions();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/delete/${commentData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        setCommentData(null);
      } else {
        console.error("Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleInputChange = (e) => {
    setCommentData({ ...commentData, text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/update/${commentData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ text: commentData.text }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  if (!commentData) {
    return null;
  }

  return (
    <li key={commentData._id}>
      <div>
        <p>{commentData.author.username}</p>
        {isAdmin && <small>author id: {commentData.author._id}</small>}
        <small>Added: {formatTimestamp(commentData.timestamp)}</small>
        {commentData.edited && (
          <small>Last edit: {formatTimestamp(commentData.edited)}</small>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={commentData.text}
            onChange={handleInputChange}
          />
          <button type="submit">OK</button>
        </form>
      ) : (
        <p>{commentData.text}</p>
      )}
      {(isAuthor(commentData) || isAdmin) && (
        <div>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
      {isAdmin && <small>comment id: {commentData._id}</small>}
    </li>
  );
}
