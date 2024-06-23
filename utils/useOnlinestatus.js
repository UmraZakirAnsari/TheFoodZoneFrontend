import { useEffect, useState } from "react";

const useOnlineStatus=()=>{
    const[OnlineStatus,setOnlineStatus]=useState(true);
    //check online or offline

    useEffect(()=>{
        window.addEventListener("offline", (event) => {
                      setOnlineStatus(false);
        });
        window.addEventListener("online", (event) => {
            setOnlineStatus(true);
});

    },[]);

    return OnlineStatus;
}
export default useOnlineStatus;``