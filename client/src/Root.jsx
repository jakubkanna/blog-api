// Root.js
import { useEffect, useState } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import "./styles/root.css";
import routes from "./lib/routesConfig"; // Import the routes configuration
import { AuthProvider } from "./context/AuthContext";

export default function Root() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const matches = matchRoutes(routes, location);
    const lastMatch = matches && matches[matches.length - 1];
    if (lastMatch && lastMatch.route.meta && lastMatch.route.meta.title) {
      document.title = lastMatch.route.meta.title;
      setTitle(lastMatch.route.meta.title);
    }
  }, [location]);

  return (
    <>
      <AuthProvider>
        <Header />
        <Main title={title} />
        <Footer />
      </AuthProvider>
    </>
  );
}
