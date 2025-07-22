import { HashRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/Landing';
import LoginPage from './components/LoginPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App
