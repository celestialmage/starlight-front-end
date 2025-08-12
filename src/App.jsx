import { HashRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/timeline/Landing';
import LoginPage from './components/login/LoginPage';
import PostDetails from './components/post/PostDetails';
import Profile from './components/profile/Profile';
import './App.css';
import SearchPage from './components/search/SearchPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/:username/:postId' element={< PostDetails /> } />
        <Route path='/' element={<Landing />} />
        <Route path='/:username' element={< Profile />} />
        <Route path='/search' element={< SearchPage />} />
      </Routes>
    </Router>
  )
}

export default App
