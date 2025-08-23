const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require("./middlewares/authMiddlewares");

const app = express();

app.use(cors());
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
  origin: ["https://notes-app-olive-phi.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
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
