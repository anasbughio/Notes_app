import { useState } from "react";
import axios from "../axiosConfig"; 
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  IconButton,
  Tooltip,
  Zoom
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "notes",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Back to Notes">
            <IconButton onClick={() => navigate("/")} sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Create New Note
          </Typography>
        </Box>

        <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Box component="form" onSubmit={createNote} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              placeholder="Title"
              variant="standard"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '1.8rem', fontWeight: 700 }
              }}
              autoFocus
            />
            
            <TextField
              placeholder="Take a note..."
              variant="standard"
              multiline
              rows={10}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '1.1rem', lineHeight: 1.6 }
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  disabled={!title.trim() || !content.trim()}
                  sx={{ 
                    borderRadius: 3, 
                    px: 4, 
                    py: 1.5,
                    boxShadow: '0 8px 16px rgba(98, 0, 238, 0.3)'
                  }}
                >
                  Save Note
                </Button>
              </Zoom>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AddNote;
