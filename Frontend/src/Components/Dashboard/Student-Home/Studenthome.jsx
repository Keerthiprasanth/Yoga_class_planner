import { Router } from "express";
import StudentHeaderComponent from "./StudentHeader/StudentHeader.jsx";
const Studenthome = () => {
  return (
    <div className="home">
        <div className="header">
        <StudentHeaderComponent />
        </div>
        <div className="view">

        </div>
    </div>
  );
}

export default Studenthome;
