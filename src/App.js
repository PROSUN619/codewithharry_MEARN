import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './contexts/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import AlertState from './contexts/notes/AlertState';

function App() {

  return (
    <>
      <NoteState>
        <AlertState>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </AlertState>
      </NoteState>
    </>
  );
}

export default App;
