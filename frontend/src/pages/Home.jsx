import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Fab,
  Tooltip,
  Grow,
  Fade
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

const noteColors = [
  "#fff475", "#f28b82", "#fbbc04", "#ccff90", "#a7ffeb",
  "#cbf0f8", "#aecbfa", "#d7aefb", "#fdcfe8", "#e6c9a8", "#ffffff"
];

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const notesWithColors = res.data.map(note => ({
        ...note,
        color: noteColors[Math.floor(Math.random() * noteColors.length)]
      }));
      setNotes(notesWithColors);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    setNotes(prev => prev.filter(n => n._id !== id));

    try {
      await axios.delete(`notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Delete failed:', error);
      fetchNotes();
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Typography variant="h6">Loading your notes...</Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative', minHeight: '80vh' }}>
      <AnimatePresence>
        {notes.length === 0 ? (
          <Fade in={true} timeout={1000}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              mt: 10
            }}>
              <Box sx={{ width: { xs: 300, sm: 400 }, height: { xs: 300, sm: 400 } }}>
                <Lottie 
                  animationData={{
                    v: "5.5.7",
                    fr: 60,
                    ip: 0,
                    op: 60,
                    w: 400,
                    h: 400,
                    nm: "Empty Notes",
                    ddd: 0,
                    assets: [],
                    layers: [] // simplified for brevity, in practice use a real JSON
                  }}
                  path="https://assets9.lottiefiles.com/packages/lf20_glp9v7ip.json"
                  loop={true}
                />
              </Box>
              <Typography variant="h5" color="textSecondary" sx={{ mt: -4, fontWeight: 600 }}>
                No notes found. Let's create one!
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note, index) => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card 
                    sx={{ 
                      backgroundColor: note.color,
                      borderRadius: 4,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      position: 'relative',
                      minHeight: 180,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        '& .delete-btn': { opacity: 1 }
                      }
                    }}
                  >
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box component={Link} to={`/note/${note._id}`} sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'rgba(0,0,0,0.8)' }}>
                          {note.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                          {note.content}
                        </Typography>
                      </Box>
                      
                      <Tooltip title="Delete Note">
                        <IconButton 
                          className="delete-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteNote(note._id);
                          }}
                          sx={{ 
                            position: 'absolute', 
                            bottom: 8, 
                            right: 8,
                            opacity: { xs: 1, md: 0 },
                            transition: 'opacity 0.2s',
                            bgcolor: 'rgba(255,255,255,0.5)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.8)', color: 'error.main' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        style={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        <Tooltip title="Add New Note" placement="left">
          <Fab 
            color="primary" 
            component={Link} 
            to="/add"
            sx={{ 
              width: 64, 
              height: 64,
              boxShadow: '0 8px 16px rgba(98, 0, 238, 0.4)'
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        </Tooltip>
      </motion.div>
    </Container>
  );
};

export default Home;
