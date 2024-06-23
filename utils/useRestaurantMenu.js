import { useEffect, useState } from "react";
import { Menu_API } from "../utils/constant";
const useRestauarntMenu=(resId)=>{
    //fetch data;
    const[restInfo,setRestInfo]=useState(null);
       useEffect(()=>{
fetchData();
       },[]);

    const fetchData=async()=>{
    const data=await fetch (Menu_API+resId);
    const json =await data.json();  
    setRestInfo(json.data );
      };
    return  restInfo;
    
};
   
export default useRestauarntMenu;