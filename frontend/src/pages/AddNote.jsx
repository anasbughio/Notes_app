import { useState } from "react";
import axios from "../axiosConfig"; 
import { useNavigate } from "react-router-dom";
import "../CSS/AddNote.css";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [note, setNote] = useState([]);

  const navigate = useNavigate();

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/notes",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNote([res.data, ...note]);
      navigate("/");
      setTitle("");
      setContent("");

      console.log("Note added successfully:", res.data);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="add-note-page min-h-[calc(100vh-60px)] flex items-center justify-center">
      <form onSubmit={createNote} className="add-note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title"
        />
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-content"
        ></textarea>
        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
};

export default AddNote;
