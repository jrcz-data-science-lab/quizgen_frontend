import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx'
import LoginInput from './pages/LoginInput.jsx';
import SignUp from './pages/Signup.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Upload from "./pages/Upload.jsx";
import EdiText from "./pages/EdiText.jsx";
import QuestionType from "./pages/questions/QuestionType.jsx";
import MCQGenerator from "./pages/questions/MCQGenerator.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/view" element={<Login />} />
        <Route path="/login" element={<LoginInput />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit" element={<EdiText />} />
          <Route path="/choose" element={<QuestionType />} />
          <Route path="/generate" element={<MCQGenerator />} />
      </Routes>
    </Router>
  )
}

export default App;
