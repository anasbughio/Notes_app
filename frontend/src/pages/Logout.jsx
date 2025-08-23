const Logout = () => {
  const logoutUser = () => {
    localStorage.removeItem("token"); // Remove JWT
  window.dispatchEvent(new Event("authChange")); // 🔥 force Navbar to update
    alert("Logged out successfully");
    window.location.href = "/auth/login"; // Redirect to login page
  };

  return (
  <button
  onClick={logoutUser}
  style={{
    padding: "5px 12px",        // smaller padding
    borderRadius: "5px",
    border: "none",
    background: "linear-gradient(135deg, #ff4d4d, #b30000)",
    color: "#fff",
    fontWeight: "500",
    fontSize: "13px",           // smaller font
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(255, 77, 77, 0.3)",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.03)";
    e.target.style.boxShadow = "0 4px 10px rgba(255, 77, 77, 0.5)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 2px 6px rgba(255, 77, 77, 0.3)";
  }}
>
  🚪 Logout
</button>

  );
};

export default Logout;
