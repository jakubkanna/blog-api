import LoginForm from "../components/FormLogin";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logout from "../components/Logout";

export default function Login() {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token ? (
        <>
          <p>You are already logged in.</p>
          <Logout />
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
}
