import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login-form/LoginPage';
import HomePage from './home-page-folder/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
