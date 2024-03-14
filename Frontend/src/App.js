
import './App.css';

import TeacherSignupComponent from './Components/Authentications/Teacher/SignupComponent/Teacher-Signup.jsx'
import LoginCompoenent from './Components/Authentications/Teacher/LoginComponent/Teacher-Login.jsx';
import { BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import RedirectComponent from './Components/Authentications/Redirect/Redirect.jsx';

function App() {
  return (

    <Router>
      <Routes>
      <Route path="/" element = { <RedirectComponent></RedirectComponent>}></Route>
      <Route path="/teacher-signup" element = {<TeacherSignupComponent></TeacherSignupComponent>}> </Route>
      <Route path='/teacher-login' element ={<LoginCompoenent></LoginCompoenent>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
