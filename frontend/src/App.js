import Home from './pages/Home';
import AddNote from './pages/AddNote';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import NotesDetails from './pages/NotesDetails';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
   <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddNote /></PrivateRoute>} />
        <Route path="/note/:id" element={<PrivateRoute><NotesDetails /></PrivateRoute>} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
