import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory=(data)=>{
 
    const [showItems,SetshowItems]=useState(false);

     const handleClick=()=>{
        SetshowItems(!showItems);
     }
    return(
        <div>
        <div className="w-6/12 mx-auto my-6  bg-gray-50 shadow-lg p-4 ">
            <div className="flex justify-between cursor-pointer" onClick={handleClick}>
            <span className="font-bold text-lg">
                {data.data.title} ({data.data.itemCards.length})
                </span>
            <span>⬇</span>
            </div>
           { showItems && <ItemList items={data.data.itemCards}/>}
        </div>
    
        </div>
    );
    
};
export default RestaurantCategory;