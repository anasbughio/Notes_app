const express = require('express');
const router = express.Router();
const { addNotes, getNotes, deleteNotes, updateNotes ,getContent} = require('../controllers/todoControllers');
const authMiddleware = require('../middlewares/authMiddlewares');

router.get('/',authMiddleware,getNotes);
router.post('/',authMiddleware,addNotes);
router.get('/:id',authMiddleware,getContent)
router.put('/:id',authMiddleware,updateNotes);
router.delete('/:id',authMiddleware,deleteNotes);


module.exports = router;

