import Restaurantcard from "./Restaurantcard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listofrestaurant, setlistOfrestaurant] = useState([]);
  const [filterdrestaurant, setfilterdrestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const FETCH_OPTIONS = {
        headers: {
          "x-cors-api-key": "temp_f6632fdae41a4cba98f31223be3e235d"
        }
      };

      const data = await fetch(
        "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
        FETCH_OPTIONS
      );

      const json = await data.json();
      console.log("API Response:", json);

      // Safe extraction of restaurants array
      const restaurants =
        json?.data?.cards?.find(
          c =>
            c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setlistOfrestaurant(restaurants);
      setfilterdrestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant list:", error);
    }
  };

  const OnlineStatus = useOnlineStatus();
  if (OnlineStatus === false) {
    return (
      <h1 className="text-center font-extrabold m-8 p-8">
        Something Went Wrong!!! Please🙏 check your internet connection.....
      </h1>
    );
  }

  return listofrestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <div>
            <button
              className="px-4 bg-gray-50"
              onClick={() => {
                const filtered = listofrestaurant.filter(
                  (resData) => resData?.info?.avgRating > 4
                );
                setfilterdrestaurant(filtered);
              }}
            >
              Top-Rated-Restaurants
            </button>
          </div>

          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-4 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filtered = listofrestaurant.filter((resData) =>
                resData?.info?.name
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setfilterdrestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-wrap">
        {filterdrestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            <Restaurantcard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
