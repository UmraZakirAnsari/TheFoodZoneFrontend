

import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { Menu_API } from "../utils/constant";
import RestaurantCategory from "./RestaurantCategory"

const RestaurantMenu = () => {
    const [restinfo, setRestInfo] = useState(null);
    const { resId } = useParams();

    useEffect(() => {
        if (resId) {
            fetchMenu();
        }
    }, [resId]);

    const fetchMenu = async () => {
        try {
            const data = await fetch(Menu_API + resId);
            const json = await data.json();
            console.log(json);
            setRestInfo(json.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };
 
    if (!restinfo) {
        return <Shimmer />;
    }

    const { name, cuisines, costForTwo } = restinfo.cards[2]?.card?.card?.info ;
    
    const { itemCards } = restinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

          const categories=restinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c?.card?.["card"]?.["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    return (
        <div className="text-center">
                <h1 className="font-bold my-6 text-2xl">{name}</h1>
        
            <h3 className="font-bold text-lg">{cuisines?.join(",")}</h3>
            <h3>Rs {costForTwo/100} for Two</h3 >
            {categories.map((category,index)=>(
                //controlled component 
                <RestaurantCategory key={category.card.card.title } data={category?.card?.card} 
                />

        
            ))} 
        
            
        </div>
    );
};

export default RestaurantMenu;
