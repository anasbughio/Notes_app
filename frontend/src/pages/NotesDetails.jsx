import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

const NotesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    axios
      .get(`/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data) {
          setNote(res.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/notes/${note._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNote((prev) => ({ ...prev, title, content }));
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: "#5f6368" }}>Loading note...</p>;
  if (notFound || !note) return <p style={{ color: "red" }}>Note not found.</p>;

  return (
    <div style={styles.overlay} onClick={() => navigate("/")}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {!isEditing ? (
          <>
            <h2 style={styles.title}>{note.title}</h2>
            <p style={styles.content}>{note.content}</p>
            <div style={styles.btnRow}>
              <button
                style={styles.editBtn}
                onClick={() => {
                  setTitle(note.title);
                  setContent(note.content);
                  setIsEditing(true);
                }}
              >
                ✏️ Edit
              </button>
              <button style={styles.closeBtn} onClick={() => navigate("/")}>
                ✖ Close
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} style={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
              placeholder="Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              required
              placeholder="Take a note..."
            ></textarea>
            <div style={styles.btnRow}>
              <button type="submit" style={styles.saveBtn} disabled={saving}>
                {saving ? "Saving..." : "💾 Save"}
              </button>
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
 overlay: {
    backgroundColor: "#fffefc",
  position: "fixed",
  inset: "60px 0 0 0",  // leave space for navbar
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px", // modal not fully centered, like Keep
    zIndex: 900, // lower than navbar
  },
  
  modal: {
    background: "#ffffff", // note card background
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#202124",
    fontWeight: "600",
    fontSize: "1.3rem",
  },
  content: {
    color: "#3c4043",
    fontSize: "1rem",
    marginBottom: "15px",
    whiteSpace: "pre-wrap",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    fontSize: "1rem",
    outline: "none",
    minHeight: "120px",
    resize: "vertical",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editBtn: {
    background: "#fbbc04",
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "#202124",
    fontWeight: "bold",
  },
  saveBtn: {
    background: "#34a853",
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
  },
  cancelBtn: {
    background: "#ea4335",
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
  },
  closeBtn: {
    background: "#e0e0e0",
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    color: "#202124",
    fontWeight: "bold",
  },
};

export default NotesDetails;
