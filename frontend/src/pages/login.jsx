import axios from "../axiosConfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../CSS/Login.css'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("authChange")); // 🔥 force Navbar to update
      alert("Login successful");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <form onSubmit={loginUser} className="login-form">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {/* 👇 Link to Register */}
        <p style={{ marginTop: "10px" }}>
          Don’t have an account? <Link to="/auth/register">Register</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
