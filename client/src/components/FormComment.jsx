import { useState } from "react";
import { Link } from "react-router-dom";

export default function CommentForm({ token, slug, setComments }) {
  const [commentValue, setCommentValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      text: commentValue,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/${slug}/comments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments((prevComments) => [...prevComments, data]);
        setCommentValue(""); // Reset form
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (err) {
      // error handler
    }
  };

  return (
    <div>
      {token ? (
        <div className="comment-form">
          <h3>Add a Comment</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="comment"></label>
              <textarea
                id="comment"
                name="comment"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      ) : (
        <p>
          You must be <Link to="/login">logged in</Link> to add a comment.
        </p>
      )}
    </div>
  );
}
