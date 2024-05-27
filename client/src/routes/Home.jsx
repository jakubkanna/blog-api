import AllPosts from "./PostsAll";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <AllPosts count={6}></AllPosts>
      <Link to="/posts">display all</Link>
    </>
  );
}
