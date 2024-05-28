import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { formatTimestamp } from "../lib/helpers";
import CommentForm from "../components/FormComment";
import Comment from "../components/Comment";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../lib/useAuth";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${slug}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${slug}/comments`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchPost();
    fetchComments();
  }, [slug]);

  if (loadingPost) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="post">
      <div className="postHeader">
        <div className="postData">
          <small>Added: {formatTimestamp(post.timestamp)}</small>
          <small>Author: {post.author.username}</small>
        </div>
        <h2>{post.title}</h2>
      </div>
      <div className="postBody">
        <p>{post.body}</p>
      </div>
      <div className="postFooter">
        <div className="comments">
          {loadingComments ? (
            <div>Loading comments...</div>
          ) : (
            <>
              <ul>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Comment
                      token={token}
                      key={comment._id}
                      comment={comment}
                    />
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </ul>
              {/* PERMISSION */}
              {isLoggedIn ? (
                <CommentForm
                  token={token}
                  slug={slug}
                  setComments={setComments}
                />
              ) : (
                <p>
                  You must be <Link to="/login">logged in</Link> to add a
                  comment.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
