import AdminStudent from "./AdminStudent/AdminStudent"
import AdminTeacher from "./AdminStudent/AdminTeacher"

const AdminDashboard = () =>{
    return(
        <div>
            <div className="student-register">
            <AdminStudent></AdminStudent>
            </div>
            <div><AdminTeacher></AdminTeacher></div>
        </div>
    )
}
export default AdminDashboard

    
