import { Link } from "react-router-dom";
import "../styles/Header.css";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Logout from "../components/Logout";

export default function Header() {
  const { token } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <p className="brandname">
          <Link to="/">Blog App</Link>
        </p>
        <ul className="menu">
          <li className="menu-item">
            {token ? <Logout /> : <Link to="/login">Login</Link>}
          </li>
          <li className="menu-item">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
