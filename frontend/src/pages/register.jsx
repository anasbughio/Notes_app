import axios from "../axiosConfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  InputAdornment, 
  IconButton,
  Fade,
  Alert,
  Snackbar
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("auth/register", { username, email, password });
      localStorage.setItem("token", res.data.token);
      setOpenSnackbar(true);
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ 
      height: '85vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            Join us to start organizing your thoughts
          </Typography>

          {error && (
            <Fade in={!!error}>
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>{error}</Alert>
            </Fade>
          )}

          <Box component="form" onSubmit={registerUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ 
                py: 1.5, 
                fontSize: '1rem', 
                boxShadow: '0 4px 12px rgba(98, 0, 238, 0.3)' 
              }}
            >
              Register
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link to="/auth/login" style={{ color: '#6200ee', fontWeight: 600, textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', fontWeight: 600 }}>
          Registration successful! Please login.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
