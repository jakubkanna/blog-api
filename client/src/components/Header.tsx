import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header>
      <p className="brandname">
        <Link to="/">Blog App</Link>
      </p>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="menu-item">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </header>
  );
}
