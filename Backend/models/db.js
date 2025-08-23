const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true
    },

    img:{
        trpe:String,
       
    },
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the User model
    required: true
  },

    createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },


} ,{ timestamps: true });

const notes =  mongoose.model('notes',NotesSchema);
module.exports = notes;