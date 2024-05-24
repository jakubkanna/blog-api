import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function Main({ title }) {
  return (
    <main>
      <h1>{title}</h1>
      <Outlet />
    </main>
  );
}

Main.propTypes = {
  title: PropTypes.string,
};
