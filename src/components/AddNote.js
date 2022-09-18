import React, { useContext, useState } from 'react'
import AlertContext from '../contexts/notes/AlertContext';
import NoteContext from '../contexts/notes/NoteContext'

const AddNote = () => {

    
    const context = useContext(NoteContext)
    const { addNote } = context;
    
    const alertcontext = useContext(AlertContext)
    const { handleAlert } = alertcontext;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleSubmit = (e) => {
        e.preventDefault(); //this will prevent from page load
        //debugger;
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        handleAlert('success', 'Saved successfully');
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        //update the note object with all current property and value
    }

    return (
        <div className="container my-3">
            <h3>Add Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="description" value={note.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote