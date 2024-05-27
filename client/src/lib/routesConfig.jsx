// routesConfig.js
import Root from "../Root";
import ErrorPage from "../routes/ErrorPage";
import HomePage from "../routes/Home";
import AllPosts from "../routes/PostsAll";
import Post from "../routes/Post";
import Register from "../routes/Register";
import Login from "../routes/Login";
import Dashboard from "../components/Dashboard";
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
        path: "/dashboard",
        element: <Dashboard />,
        meta: { title: "Dashboard" },
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
