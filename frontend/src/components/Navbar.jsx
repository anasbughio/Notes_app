import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.dispatchEvent(new Event("authChange"));
    navigate("/auth/login");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid',
      borderColor: 'divider',
      color: 'text.primary'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              component={Link} 
              to="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none', 
                color: 'inherit',
                gap: 1
              }}
            >
              <StickyNote2Icon sx={{ color: theme.palette.primary.main, fontSize: 30 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                NotesApp
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {token ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/add"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ 
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3
                    }}
                  >
                    {!isMobile && "Add Note"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton onClick={handleLogout} color="inherit" sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: '12px'
                  }}>
                    <LogoutIcon />
                  </IconButton>
                </motion.div>
              </>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/auth/login" 
                  startIcon={<LoginIcon />}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/auth/register" 
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    borderRadius: '12px', 
                    textTransform: 'none', 
                    fontWeight: 600 
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
