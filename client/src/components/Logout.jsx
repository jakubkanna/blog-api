import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function Logout() {
  const { setToken } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Send a POST request to your logout endpoint
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You might want to send some token or other information in the body for server-side verification
        // For simplicity, let's just send an empty object
        body: JSON.stringify({}),
      });

      // Clear the token from localStorage and setToken to null
      localStorage.removeItem("token");
      setToken(null);

      // Redirect the user to the login page or any other page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure, if needed
    }
  };

  return <a onClick={handleLogout}>Logout</a>;
}
