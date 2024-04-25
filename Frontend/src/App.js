
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
import AsanasAddedByUser from './Components/Dashboard/AsasnsAddedByUser/AsanasAddedByUser.jsx';
import ViewAsanas from './Components/Dashboard/View-Asanas/ViewAsanas.jsx';
import CreateClassSession from './Components/Dashboard/Create-session/Create-session.jsx';
import Header from './Components/Dashboard/Header/Header.jsx';
function App() {
  return (
    <div>
    <Header></Header>
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
      <Route path='/asanasAddedByUser' element={ <AsanasAddedByUser></AsanasAddedByUser>}></Route>
      <Route path='/viewAsanas' element={<ViewAsanas id="view-asanas" />
}></Route>
<Route path='/createClssSession' element={<CreateClassSession id="create-session" />
}></Route>
                  </Routes>
    </Router>
    </div>  
  );
  
}

export default App;
