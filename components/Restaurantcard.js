import {CDN_URL} from "../utils/constant"
const Restaurantcard=(props)=>{
    const {resData}=props;
    
    const {cloudinaryImageId,
      name,
      cuisines,
      avgRatingString,
      costForTwo,
      deliveryTime
    }=resData?.info;
    return(
        <div className="res-card" style={{ backgroundColor: "#f0f0f0"}}>
            <img
            className="rest-logo"
            alt="rest-logo"
            src={CDN_URL+cloudinaryImageId}
            />
             <h3 className="font-bold py-4 text-lg">{name}</h3>
             <h4>{cuisines.join(",")}</h4>
             <h4>⭐{avgRatingString}</h4>
             <h4>{costForTwo}</h4>
             {/* <h4>{resData.info.deliveryTime} minutes</h4> */}
        </div>
    );
};
export default Restaurantcard;
