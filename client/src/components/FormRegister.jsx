import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        username: username,
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      setToken(data.token);
      localStorage.setItem("token", data.token);

      setMessage(data.message);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;
