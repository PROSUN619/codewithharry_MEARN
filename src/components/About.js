import React from 'react'
import { useContext, useEffect } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

function About() {

  const a = useContext(NoteContext);

  return (
    <div>This is About</div>
  )
}

export default About