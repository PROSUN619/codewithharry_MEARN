import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './contexts/notes/NoteState';


function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
