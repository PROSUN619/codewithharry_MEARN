import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const NoteItem = (props) => {

    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updatenote } = props;



    return (
        <div className="card col-md-3 my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className="d-flex justify-content-between">
                    <i className="fa-solid fa-pen-to-square" onClick={()=> updatenote(note)}></i>
                    <i className="fa-solid fa-trash" onClick={() => deleteNote(note._id)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem