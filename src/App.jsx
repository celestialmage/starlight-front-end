import { HashRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/timeline/Landing';
import LoginPage from './components/login/LoginPage';
import PostDetails from './components/post/PostDetails';
import Profile from './components/profile/Profile';
import './App.css';
import SearchPage from './components/search/SearchPage';
import EditUser from './components/signup/EditUser';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/search' element={< SearchPage />} />
        <Route path='/signup/:userToken' element={< EditUser />} />
        <Route path='/:username/edit' element={< EditUser />} />
        <Route path='/:username/:postId' element={< PostDetails /> } />
        <Route path='/:username' element={< Profile />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
