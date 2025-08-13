import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { Menu_API } from "../utils/constant";
import RestaurantCategory from "./RestaurantCategory";

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
      const data = await fetch(Menu_API + resId, {
        headers: {
          "x-cors-api-key": "temp_f6632fdae41a4cba98f31223be3e235d"
        }
      });
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

  // ✅ Safe destructuring with defaults
  const { name, cuisines, costForTwo } =
    restinfo?.cards?.[2]?.card?.card?.info || {};

  // ✅ itemCards optional chaining
  const itemCards =
    restinfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards || [];

  // ✅ Filter categories safely
  const categories =
    restinfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <h3 className="font-bold text-lg">{cuisines?.join(",")}</h3>
      <h3>Rs {costForTwo / 100} for Two</h3>

      {categories.map((category) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
