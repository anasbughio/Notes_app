import axios from "../axiosConfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Register.css"; // add a CSS file for styling

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", { username, email, password });
      localStorage.setItem("token", res.data.token);
      alert("Registration successful!");
      navigate("/auth/login");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={registerUser} className="register-form">
        <h2>Create Account</h2>

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>

        {/* 👇 Link to Login */}
        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
