const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1 http://localhost:5000/api/notes/fetchallnotes  fetchallnotes by user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('internal server error');
    }

});

//Route 2 http://localhost:5000/api/notes/fetchallnotes  create note by user
router.post('/addnotes', fetchUser,
    [
        body('title', 'title must be atleast 3 char').isLength({ min: 3 }),
        body('description', 'Description must be min 5 char').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            });

            const savednote = await note.save();
            res.json(savednote);

        } catch (error) {
            console.log(error.message);
            return res.status(500).send('internal server error');
        }

    });


//Route 3 http://localhost:5000/api/notes/updatenote/:id  update note by user

router.put('/updatenote/:id', fetchUser,
    [

    ],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }

            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note)
                return res.status(404).send('Note not found');


            //check if loged user is updating his notes only    
            if (note.user.toString() !== req.user.id)
                return res.status(401).send('Not Allowed');

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json(note);

        } catch (error) {
            console.log(error.message);
            return res.status(500).send('internal server error');
        }

    });

//Route 3 http://localhost:5000/api/notes/updatenote/:id  delete by user

router.put('/deletenote/:id', fetchUser,
    [

    ],
    async (req, res) => {
        try {
            
            //find the note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note)
                return res.status(404).send('Note not found');


            //check if loged user is updating his notes only    
            if (note.user.toString() !== req.user.id)
                return res.status(401).send('Not Allowed');

            note = await Notes.findByIdAndDelete(req.params.id);
            return res.status(200).send('Note Deleted');

        } catch (error) {
            console.log(error.message);
            return res.status(500).send('internal server error');
        }

    });


module.exports = router;