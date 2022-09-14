import React from 'react'
import { useContext, useEffect } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

function About() {

  const a = useContext(NoteContext);

  useEffect(() => {
    a.update();  
    // eslint-disable-next-line
  }, [])
  

  return (
    <div>This is About {a.state.name} He read in class {a.state.class}</div>
  )
}

export default About