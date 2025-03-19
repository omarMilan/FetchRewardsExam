import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          credentials: "include", // ✅ Required to store auth cookie
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      if (!response.ok) throw new Error("Login failed");

      // ✅ Redirect to search page after successful login
      navigate("/match-me");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
