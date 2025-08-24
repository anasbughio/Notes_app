const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "https://notes-app-olive-phi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Explicitly handle OPTIONS
app.options("*", cors());
app.use('/api/notes',notesRoutes);
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
