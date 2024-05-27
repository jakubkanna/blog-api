import { useContext, useState } from "react";
import { formatTimestamp } from "../lib/helpers";
import { AuthContext } from "../context/AuthContext";

export default function Comment({ comment, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentData, setCommentData] = useState(comment); // State for the entire comment object
  const { username } = useContext(AuthContext);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/delete/${comment._id}`,
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
        // Assuming you want to remove the deleted comment from the UI
        setCommentData(null);
      } else {
        console.error("Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleInputChange = (e) => {
    setCommentData({ ...commentData, text: e.target.value }); // Update the text property of the commentData object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/update/${comment._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ text: commentData.text }), // Send the updated text from commentData
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
    return null; // If commentData is null (i.e., comment has been deleted), return null to render nothing
  }

  return (
    <li key={commentData._id}>
      <div>
        <p>{commentData.author.username}</p>
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
        </form>
      ) : (
        <p>{commentData.text}</p>
      )}
      {username === commentData.author.username && (
        <div>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
