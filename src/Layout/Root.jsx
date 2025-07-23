
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import NavBar from "../pages/Shared/NavBar";



const Main = () => {
    const location = useLocation()
    

    // if it is in login or signup page it will not show navbar and footer
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup')

    return (
        <div>
             {noHeaderFooter || <NavBar></NavBar>} 

            <div className="min-h-screen  bg-[#f6e7de]">
                <Outlet></Outlet>
            </div>

            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;