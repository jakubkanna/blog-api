// routesConfig.js
import Root from "../routes/Root";
import ErrorPage from "../routes/ErrorPage";
import HomePage from "../routes/Home";
import AllPosts from "../routes/AllPosts";
import Post from "../routes/Post";
import Register from "../routes/Register";
import Login from "../routes/Login";

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
        children: [
          {
            path: "/posts/:slug",
            element: <Post />,
            meta: { title: "Post - slug" },
          },
        ],
      },
    ],
  },
];

export default routes;
