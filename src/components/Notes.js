import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    const context = useContext(NoteContext)
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const navigate = useNavigate();

    useEffect(() => {        
        if (!localStorage.getItem('token')) {
            //console.log('called');
            navigate("/login");
        }
        else {
            getNotes();
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (note) => {
        //console.log('Update note clicked');
        ref.current.click();
        setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //this will prevent from page load
        //debugger;
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    //debugger;
    return (
        <>
            <AddNote />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" onChange={handleChange} value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edesc" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edesc" name="edescription" onChange={handleChange} value={note.edescription} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" onChange={handleChange} value={note.etag} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary" onClick={handleSubmit} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <h3>Your Notes</h3>
                    {
                        (notes.length === 0) && <div>No note found</div>
                    }
                    {
                        notes.map((note) => {
                            //console.log(note);    
                            return <NoteItem key={note._id} updatenote={updateNote} note={note} />
                            //return note.title
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes