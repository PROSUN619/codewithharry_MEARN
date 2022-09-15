import { useState } from "react";
import NoteContext from "./NoteContext";





const NoteState = (props) => {

    const noteInitials = [
        {
            "_id": "63228ea43c6f452c295d9f09",
            "user": "631f43c411545502f20f5e43",
            "title": "My Title 1",
            "description": "My Description 1",
            "tag": "My Tag 1",
            "date": "1663209124912",
            "__v": 0
        },
        {
            "_id": "63228eaf3c6f452c295d9f0b",
            "user": "631f43c411545502f20f5e43",
            "title": "My Title 2",
            "description": "My Description 2",
            "tag": "My Tag 2",
            "date": "1663209135135",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(noteInitials)

    //add note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "63228eaf3c6f452c295d9f0bqwe",
            "user": "631f43c411545502f20f5e43",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "1663209135135",
            "__v": 0
        };
        setNotes(notes.concat(note)); // we are using concat instead of push becasue concat use new Array
    }

    //edit note
    const editNote = () => {
    }

    //delete note 
    const deleteNote = (id) => {
        const newNotes = notes.filter((x) => x._id !== id);
        //or
        //const newNote = notes.filter((x) => {return x._id !== id});
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;