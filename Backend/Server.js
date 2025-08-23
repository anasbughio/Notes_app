const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require("./middlewares/authMiddlewares");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://notes-app-olive-phi.vercel.app",
  "https://notes-app-git-main-anas-projects-ddcc6eed.vercel.app"
];

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));
app.use('/api/notes',authMiddleware,notesRoutes);
app.use('/api/auth',authRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("COnnected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
    
})
.catch((err)=>{
    console.error(`Error Connecting to MongoDB:${err.message}`);
})
