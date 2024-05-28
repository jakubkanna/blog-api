import "../styles/Header.css";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import useAuth from "../lib/useAuth";

export default function Header() {
  const { isLoggedIn } = useAuth();
  return (
    <header>
      <nav>
        <p className="brandname">
          <Link to="/">Blog App</Link>
        </p>
        <ul className="menu">
          <li className="menu-item">
            {isLoggedIn && <Link to="/">Settings</Link>}
          </li>
          <li className="menu-item">
            {isLoggedIn ? <Logout /> : <Link to="/login">Login</Link>}
          </li>
          <li className="menu-item">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
