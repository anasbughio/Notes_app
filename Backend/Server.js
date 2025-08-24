const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRoutes =;
const authRoutes = ;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Minimal CORS fix for Vercel frontend
app.use(cors({
  origin: "https://notes-app-olive-phi.vercel.app", // exact frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Ensure all preflight OPTIONS requests succeed
app.options("*", cors());

app.use(express.json());

// Routes
app.use('/api/notes',  require('./routes/notesRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(`❌ MongoDB connection error: ${err.message}`);
  });
