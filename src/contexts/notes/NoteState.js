import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000';

    // const noteInitials = [
    //     {
    //         "_id": "63228ea43c6f452c295d9f09",
    //         "user": "631f43c411545502f20f5e43",
    //         "title": "My Title 1",
    //         "description": "My Description 1",
    //         "tag": "My Tag 1",
    //         "date": "1663209124912",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63228eaf3c6f452c295d9f0b",
    //         "user": "631f43c411545502f20f5e43",
    //         "title": "My Title 2",
    //         "description": "My Description 2",
    //         "tag": "My Tag 2",
    //         "date": "1663209135135",
    //         "__v": 0
    //     }
    // ]

    //const [notes, setNotes] = useState(noteInitials)
    const [notes, setNotes] = useState([])

    //get all Notes

    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjQzYzQxMTU0NTUwMmYyMGY1ZTQzIn0sImlhdCI6MTY2MzA0MDUxN30.VgRk4AcIIFuZ7nhAMjfu8vutqfJ0zeQbHA820zcett4'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            //body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects   
        setNotes(note);
    }

    //add note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjQzYzQxMTU0NTUwMmYyMGY1ZTQzIn0sImlhdCI6MTY2MzA0MDUxN30.VgRk4AcIIFuZ7nhAMjfu8vutqfJ0zeQbHA820zcett4'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects

        // const note = {
        //     "_id": "63228eaf3c6f452c295d9f0bqwe",
        //     "user": "631f43c411545502f20f5e43",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "1663209135135",
        //     "__v": 0
        // };
        setNotes(notes.concat(note)); // we are using concat instead of push becasue concat use new Array
    }

    //edit note
    const editNote = async (id, title, description, tag) => {


        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjQzYzQxMTU0NTUwMmYyMGY1ZTQzIn0sImlhdCI6MTY2MzA0MDUxN30.VgRk4AcIIFuZ7nhAMjfu8vutqfJ0zeQbHA820zcett4'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        console.log(await response.json());
        //const json = await response.json(); // parses JSON response into native JavaScript objects

        const newNote = JSON.parse(JSON.stringify(notes));
        // we are using json parse because its create a new instance of onject
        //otherwise newnote will hold the note value
        //ebugger
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index]._id = id;
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }

        setNotes(newNote);
    }

    //delete note 
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZjQzYzQxMTU0NTUwMmYyMGY1ZTQzIn0sImlhdCI6MTY2MzA0MDUxN30.VgRk4AcIIFuZ7nhAMjfu8vutqfJ0zeQbHA820zcett4'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            //body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        //debugger
        console.log(await response);
        //const note = await response.json(); // parses JSON response into native JavaScript 

        const newNotes = notes.filter((x) => x._id !== id);
        //or
        //const newNote = notes.filter((x) => {return x._id !== id});
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;