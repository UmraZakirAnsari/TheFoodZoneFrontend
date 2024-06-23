
import {LOGO_URL} from "../utils/constant";
import { useState,useEffect,useContext } from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector}  from "react-redux";

const Header=()=>{
    
    const [btnNameReact,setbtnNameReact]=useState("Login");
    const OnlineStatus= useOnlineStatus();
    const {loggedInUser}=useContext(UserContext);
    // subscribing to the store using a selector (selector is a hook in react )
    const cartItems =useSelector((store)=>store.cart.items)
    useEffect(()=>{
        console.log("useEffect Called")
    },[])

    return(
        <div className="flex justify-between bg-red-200 shadow-lg m-2">
            <div className="logo-container">
                <img className="w-56" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                 <ul className="flex p-4 m-4 " >
                    <li className="px-4 text-lg">
                    Online Status: {OnlineStatus ?" ✅":"🔴"}                          
                    </li>
                    <li className="px-4 text-lg">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4 text-lg">
                        <Link to ="/About">About us</Link >
                        </li>
                    <li className="px-4 text-lg">
                   <Link to="/contact">Contact us</Link>     
                   </li>
                    <li className="px-4 text-lg ">
                    <Link to="/cart">🛒Cart-({cartItems.length}items)</Link>   
                        </li>
                    {/* <button className="Login" onClick={()=>{

                       btnNameReact==="Login" ? setbtnNameReact("Logout"):setbtnNameReact("Login");
                    }}>{
                            btnNameReact
                        }</button> */}
                   <li className="px-4 text-lg">
                        <Link to="/login">Login</Link>
                    </li>

                         <li className="px-4 font-bold ">{loggedInUser}</li>
                 </ul>
            </div>
        </div>
    );
};

export default Header;