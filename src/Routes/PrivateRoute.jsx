import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation()

    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if(user){
        return children;
    } 
    // return <Navigate to="/login" state={{from:location}}></Navigate>
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;