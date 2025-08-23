import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';

const noteColors = [
  "#fff475", "#f28b82", "#fbbc04", "#ccff90", "#a7ffeb",
  "#cbf0f8", "#aecbfa", "#d7aefb", "#fdcfe8", "#e6c9a8", "#ffffff"
];

const Home = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const notesWithColors = res.data.map(note => ({
        ...note,
        color: noteColors[Math.floor(Math.random() * noteColors.length)]
      }));
      setNotes(notesWithColors);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    // ✅ Optimistic update: remove from UI immediately
    setNotes(prev => prev.filter(n => n._id !== id));

    try {
      await axios.delete(`/notes/${id}`, {  // note the leading slash
        headers: { Authorization: `Bearer ${token}` }
      });
      // success: nothing else needed
    } catch (error) {
      console.error('Delete failed:', error);
      // Optional rollback by re-fetching:
      fetchNotes();
    }
  };

  return (
    <div>
      <div className="notes-container">
        {notes.length === 0 ? (
          <p style={{ textAlign: "center", color: "#5f6368", fontSize: "1.2rem", marginTop: "40px" }}>
            No notes available
          </p>
        ) : (
          notes.map(note => (
            <div key={note._id} className="note-card" style={{ backgroundColor: note.color }}>
              <Link to={`/note/${note._id}`} className="note-link">
                <p className="note-title">{note.title}</p>
                <p className="note-content">{note.content}</p>
              </Link>

              {/* ✅ Prevent navigation when clicking delete */}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteNote(note._id);
                }}
                aria-label="Delete note"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
