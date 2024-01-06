import "../Css/Header.css";
import { useLocation } from "react-router-dom";
export default function Header(){
    const location = useLocation();
    return(
        <div className="Header">
            <h1>
                Rent-A-Home Dübendorf
            </h1>
            <div className="Links">
            <a href="/" className={location.pathname === "/" ? "currentPage" : ""}>Home</a> 
            <a href="/login" className={location.pathname === "/login" ? "currentPage" : ""}>Login</a>
            <a href="/contact" className={location.pathname === "/contact" ? "currentPage" : ""}>Contact</a>

            </div>
        </div>
    )
}