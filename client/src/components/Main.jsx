import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function Main({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Outlet />
    </div>
  );
}

Main.propTypes = {
  title: PropTypes.string,
};
