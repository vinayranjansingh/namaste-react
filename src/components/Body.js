import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
    const [listOfRestaurants, setListOfRestraunt] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4374374&lng=77.05857499999999");
        const json = await data.json(); 
        const listOfRestaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setListOfRestraunt(listOfRestaurants);
        setFilteredRestaurant(listOfRestaurants);
    }

    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                        setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                        const filteredRestaurant = listOfRestaurants.filter((res) =>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurant);
                        }}
                    >
                        Search
                    </button>
                </div>
                <button
                    className="filter-btn"
                    onClick={() => {
                        const filteredList = filteredRestaurant.filter((res) => res.info.avgRating > 4);
                        setListOfRestraunt(filteredList);
                    }} >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                { filteredRestaurant.map((restaurant) => (
                    <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}><RestaurantCard resData={restaurant.info} /></Link>
                ))}
            </div>
        </div>
    );
};

export default Body;