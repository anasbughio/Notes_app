const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRoutes =;
const authRoutes = ;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://notes-app-olive-phi.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.sendStatus(200); // ✅ important for preflight
  next();
});


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
