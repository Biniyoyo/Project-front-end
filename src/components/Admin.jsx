import { AllInclusiveSharp } from "@mui/icons-material";
import "../css/admin.css"
function Admin(props){
    const {allUsers, setAllUsers, admin} = props;

    //will be replaced by allUsers
    const users = [
        {
            name:"user1",
            email:"user1@com",
            totalQuestion:10,
            numberOfResponses:8

        },
        {
            name:"user2",
            email:"user2@com",
            totalQuestion:7,
            numberOfResponses:2

        },
        {
            name:"user3",
            email:"user3@com",
            totalQuestion:13,
            numberOfResponses:8

        }
    ]

    const deleteUserButton = (n)=>{
        console.log(n);
    }

    return (
        <>
        <div className="totalUser">Total Users: {users.length}</div>
        {users.map((u)=>(
            <>
            <div className="user">
                <div>Name of user: {u.name}</div>
                <div>Email of user: {u.email}</div>
                <div>Total number of questions: {u.totalQuestion}</div>
                <div>Total number of responses: {u.numberOfResponses}</div>
                <br></br>
                <button 
                    className="deleteUser"
                    onClick = {deleteUserButton(u.name)}
                    > 
                        Delete {u.name}
                </button>
            
            </div>
            </>
        ))}
        </>
    );
}
export default Admin;