import { HashRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/timeline/Landing';
import LoginPage from './components/LoginPage';
import PostDetails from './components/post/PostDetails';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/:username' element={< UserProfile />} /> */}
        <Route path='/:username/:postId' element={< PostDetails /> } />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
