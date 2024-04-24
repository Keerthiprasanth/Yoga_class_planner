
import './App.css';

import TeacherSignupComponent from './Components/Authentications/Teacher/SignupComponent/Teacher-Signup.jsx'
import LoginCompoenent from './Components/Authentications/Teacher/LoginComponent/Teacher-Login.jsx';
  import StudentSignupComponent from './Components/Authentications/student/SignupComponent/Student-Signup.jsx';
  import StudentLoginComponent from './Components/Authentications/student/LoginComponent/Student-Login.jsx';
import { BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import RedirectComponent from './Components/Authentications/Redirect/Redirect.jsx';
import DashboardComponent from './Components/Dashboard/Dashboard.jsx';
import StudentDashboard from './Components/Studnet-Dashboard/Student-Dashboard.jsx';
import TeacherSettings from './Components/Dashboard/TeacherSetting/Teacher-setting.jsx';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element = { <RedirectComponent></RedirectComponent>}></Route>
      <Route path="/teacher-signup" element = {<TeacherSignupComponent></TeacherSignupComponent>}> </Route>
      <Route path='/teacher-login' element ={<LoginCompoenent></LoginCompoenent>}></Route>
      <Route path='/student-signup' element = {<StudentSignupComponent></StudentSignupComponent>}></Route>
      <Route path='/student-login' element = {<StudentLoginComponent></StudentLoginComponent>}></Route>
      <Route path='/dashboard' element={<DashboardComponent></DashboardComponent>} ></Route>
      <Route path='/student-dashboard' element={<StudentDashboard></StudentDashboard>}></Route>
      <Route path='/teacher-settings' element={<TeacherSettings></TeacherSettings>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
