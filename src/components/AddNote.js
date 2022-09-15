import React, { useContext, useState } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const AddNote = () => {

    const context = useContext(NoteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleSubmit = (e) => {
        e.preventDefault(); //this will prevent from page load
        //debugger;
        addNote(note.title, note.description, note.tag);
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
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Password</label>
                    <input type="text" className="form-control" id="desc" name="description" onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote