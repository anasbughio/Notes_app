import { Link } from "react-router-dom";
import Logout from "../pages/Logout";
import { useState, useEffect } from "react";
import "../CSS/navbar.css";

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2000,
        background: "#fff",
        borderBottom: "1px solid #dadce0",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 style={{ fontWeight: "bold", color: "#202124", fontSize: "20px", margin: 0 }}>
          NotesApp
        </h1>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {token && <Link to="/add" className="add-btn">+ Add Note</Link>}
        {token && <Logout />}
      </div>
    </nav>
  );
}
