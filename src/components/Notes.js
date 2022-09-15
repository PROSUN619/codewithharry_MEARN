import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(NoteContext)
    const { notes } = context;
    //debugger;
    return (
        <>
            <AddNote />
            <div className="container">
                <div className="row">
                    <h3>Your Notes</h3>
                    {
                        notes.map((note) => {
                            //console.log(note);    
                            return <NoteItem key={note._id} note={note} />
                            //return note.title
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes