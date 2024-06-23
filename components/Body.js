
import Restaurantcard from "./Restaurantcard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
 const [listofrestaurant, setlistOfrestaurant] = useState([]);
 const [filterdrestaurant,setfilterdrestaurant]=useState([]);
 const [searchText, setsearchText] = useState("");
 console.log("body rendered",listofrestaurant)
 useEffect(()=>{
   fetchData();  
 },[]);
  const fetchData = async ()=>{
  //  const data= await fetch("http://localhost:3000/foodzone/web/list");
  //  const body=await data.json();
  //  const json=body.data;
  //  console.log(json); 
   
  const data= await fetch("https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json=await data.json();
  console.log(json); 
   setlistOfrestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
   setfilterdrestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
  

 };
   const OnlineStatus=useOnlineStatus();
          if(OnlineStatus===false)
          return <h1 className="text-center font-extrabold M-8 P-8">
           Something Went Wrong!!! Please🙏 check your internet connection.....
           </h1>

  //coditional rendering
 
 return listofrestaurant.length===0 ? <Shimmer/> : (
   <div className="body">
      <div className="filter flex">
            <div className="search m-4 p-4 ">
              <div>
              <button className="px-4 bg-gray-50 " onClick={() => {
     const filterdrestaurant = listofrestaurant.filter((resData) => resData.info.avgRating > 4
      );
       setfilterdrestaurant(filterdrestaurant)
    }}
     >
       Top-Rated-Restaurants</button>
              </div>

          <input type="text" className="border border-solid border-black" value={searchText}
          onChange={(e)=>{
           setsearchText(e.target.value)
         }}
         />
   <button className="px-4   bg-green-100 m-4 rounded-lg" 
    onClick={()=>{
            console.log(searchText);
             const filterdrestaurant= listofrestaurant.filter((resData)=>resData.info.name.toLowerCase().includes(searchText.toLowerCase( )));
            setfilterdrestaurant(filterdrestaurant);
             setlistOfrestaurant(listofrestaurant);
          }} 
         >Search </button>
      </div>
     </div>
     <div className=" flex flex-wrap">
       {
     filterdrestaurant.map((restaurant) =>       
       <Link 
       key={restaurant.info.id}  to
       = {"/restaurants/"+restaurant.info.id}>  < Restaurantcard  resData={restaurant} /></Link>              )
        
       }
    </div>
     
  </div> 
);
};


export default Body;

