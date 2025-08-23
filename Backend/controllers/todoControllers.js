const   notes  = require('../models/db');


const addNotes = async (req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const img = req.body.img;
    try {
    const note = new notes({
        title,    
        content,
        img,
        user: req.user.userId,
        createdAt:Date.now()
        }); 
   await note.save();
    console.log('Note added:', note);
    //  const populatedPost = await notes.findById(post._id).populate("auther","username email _id");
    res.status(201).json(note);
        
    } catch (error) {
        console.error('Error adding note:', error.message);
        throw error;   
    }
}


const getNotes =async (req,res)=>{
    try {
          const Notes = await notes.find({user:req.user.userId} );
        res.status(200).json(Notes);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
const getContent = async(req,res)=>{
    try {
    const note = await notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteNotes = async(req,res)=>{
   const  note = await notes.findByIdAndDelete(req.params.id);
    if(!note){
        return res.status(404).json({error:"Note not founnd"});
    }
    res.status(500).json(note);
}

const updateNotes = async(req,res)=>{
    const id = req.params.id;
    const {title,content,img} = req.body;
    const note = await notes.findByIdAndUpdate(id, {title, content, img}, {new: true});
    if(!note){
        return res.status(404).json({error:"Note not found"});
    }
    res.status(200).json(note);   
}


module.exports =  {addNotes,getNotes,deleteNotes,updateNotes,getContent};



