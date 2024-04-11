import StudentHeader from "./Header/Header";
import StudentHome from "./Home/Home";

const StudentDashboard = () => {
    return(
        <div>
            <div className="student-Header">
            <StudentHeader></StudentHeader>
            </div>
            <br></br>
            <div className="student-home">
                <StudentHome></StudentHome>
            </div>
        </div>
    )
    };
    
    export default StudentDashboard;
    