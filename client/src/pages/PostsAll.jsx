import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllPosts({ count = 999 }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch failed:", error.message);
      }
    };

    fetchPosts();
  }, []); // on mount

  return (
    <div>
      <ul>
        {posts
          .filter((post, index) => index < count && post.public === true)
          .map((post) => (
            <li key={post._id}>
              <Link to={`/posts/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
