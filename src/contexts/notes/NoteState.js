import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    
    const [state, setstate] = useState({
            "name": "harry",
            "class": "5b"
    });

    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "harry updated",
                "class": "5b updated"
            });    
        }, 2000);        
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;