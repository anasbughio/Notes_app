import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  IconButton, 
  Tooltip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Fade
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

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
      .get(`notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data) {
          setNote(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
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
        `notes/${note._id}`,
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

  const deleteNote = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/");
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress />
    </Box>
  );

  if (notFound || !note) return (
    <Container sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h5" color="error">Note not found.</Typography>
      <Button onClick={() => navigate("/")} sx={{ mt: 2 }}>Back to Home</Button>
    </Container>
  );

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      bgcolor: 'rgba(0,0,0,0.5)', 
      zIndex: 1300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }} onClick={() => navigate("/")}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{ width: '90%', maxWidth: '700px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Paper elevation={24} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Note Details</Typography>
            <IconButton onClick={() => navigate("/")}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          
          <Box component="form" onSubmit={handleUpdate} sx={{ p: 4 }}>
            {!isEditing ? (
              <Fade in={true}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap', minHeight: '150px', lineHeight: 1.7 }}>
                    {note.content}
                  </Typography>
                </Box>
              </Fade>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  variant="standard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  InputProps={{ disableUnderline: true, style: { fontSize: '1.8rem', fontWeight: 700 } }}
                  autoFocus
                />
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  variant="standard"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                  InputProps={{ disableUnderline: true, style: { fontSize: '1.1rem', lineHeight: 1.7 } }}
                />
              </Box>
            )}
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Delete Note">
                  <IconButton onClick={deleteNote} color="error" sx={{ bgcolor: 'error.light', color: 'white', '&:hover': { bgcolor: 'error.main' } }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {!isEditing ? (
                  <Button 
                    variant="contained" 
                    startIcon={<EditIcon />} 
                    onClick={() => setIsEditing(true)}
                    sx={{ borderRadius: 3, px: 3 }}
                  >
                    Edit Note
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => setIsEditing(false)} color="inherit">Cancel</Button>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      startIcon={<SaveIcon />} 
                      disabled={saving}
                      sx={{ borderRadius: 3, px: 3 }}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default NotesDetails;
