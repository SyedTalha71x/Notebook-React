const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../Models/Notes');
const { validationResult, body } = require('express-validator');




// Get all the notes from database

router.get('/fetchallnotes', fetchuser, async (req, res) => {
     try {
          const notes = await Notes.find({ user: req.user.id });
          res.json(notes);
     }
     catch (error) {
          console.log(error);
          res.status(500).json({ error: "Some  Internal Errors Occurred" });
     }
});

// add notes to the databases
router.post('/addnotes', fetchuser, [
     body('title', 'enter a valid title').isLength({ min: 3 }),
     body('description', 'enter a valid description').isLength({ min: 6 })

], async (req, res) => {
     const { title, description } = req.body;

     try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const note = new Notes({
               title, description, user: req.user.id
          })
          const saveNote = await note.save();
          res.json(saveNote);
     }
     catch (error) {
          console.log(error);
          res.status(500).json({ error: "Some  Internal Errors Occurred" });
     }
});


router.put('/updatenotes/:id', fetchuser, async (req, res) => {
     const { title, description } = req.body;
     // create a new note object
     const newnote = {};
     if (title) { newnote.title = title };
     if (description) { newnote.description = description };

     //find the note to be updated
     let note = await Notes.findById(req.params.id); 
     if (!note) {
          return res.status(404).json({ error: "Not Found" });
     }
     if (note.user.toString() !== req.user.id) {
          return res.status(401).json({ error: "Sorry you cannot access another user notes! Not Allowed" });
     }

     note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
     res.json({ note });

}); 




router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
     const { title, description } = req.body;


     //find the note to be deleted
     let note = await Notes.findById(req.params.id); 
     if (!note) {
          return res.status(404).json({ error: "Not Found" });
     }

     // allow deletion if user owns this notes
     if (note.user.toString() !== req.user.id) {
          return res.status(401).json({ error: "Sorry you cannot access another user notes! Not Allowed" });
     }

     note = await Notes.findByIdAndDelete(req.params.id);
     res.json({"Succes": "Note has been deleted", note: note});

}); 


module.exports = router