const express = require('express');
const router = express.Router();
const { addNotes, getNotes, deleteNotes, updateNotes ,getContent} = require('../controllers/todoControllers');
const authMiddleware = require('../middlewares/authMiddlewares');

router.get('/',getNotes);
router.post('/',addNotes);
router.get('/:id',getContent)
router.put('/:id',updateNotes);
router.delete('/:id',deleteNotes);


module.exports = router;
