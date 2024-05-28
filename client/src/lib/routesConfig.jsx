// routesConfig.js
import Root from "../Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Home";
import AllPosts from "../pages/PostsAll";
import Post from "../pages/Post";
import Register from "../pages/Register";
import Login from "../pages/Login";
const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        meta: { title: "Home" },
      },
      {
        path: "/register",
        element: <Register />,
        meta: { title: "Register" },
      },
      {
        path: "/login",
        element: <Login />,
        meta: { title: "Login" },
      },
      {
        path: "/posts",
        element: <AllPosts />,
        meta: { title: "All Posts" },
      },
      {
        path: "/posts/:slug",
        element: <Post />,
        meta: { title: "Post" }, //fetch title
      },
    ],
  },
];

export default routes;
