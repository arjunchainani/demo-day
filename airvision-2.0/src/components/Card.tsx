import { useState } from "react";
import APIRequest from "../../backend/fetch";
import GeoApify, { WAQI } from "../../backend/interfaces";
import "../App.css";

interface Props {
  cities: string[];
}

interface City {
  city: string;
  aqi: number;
  loaded: boolean;
}

const Card = ({ cities }: Props) => {
  // Three state variables to keep track of three popular cities info
  const [city1Info, updateCity1Info] = useState({
    city: cities[0],
    aqi: 0,
    loaded: false,
  });
  const [city2Info, updateCity2Info] = useState({
    city: cities[1],
    aqi: 0,
    loaded: false,
  });
  const [city3Info, updateCity3Info] = useState({
    city: cities[2],
    aqi: 0,
    loaded: false,
  });

  const loadCities = async (
    cityInfo: City,
    updateCityInfo: React.Dispatch<
      React.SetStateAction<{
        city: string;
        aqi: number;
        loaded: boolean;
      }>
    >
  ) => {
    // let result: GeoApify = await APIRequest("Paris", 0);
    // let placeID = result.results[0].place_id;

    let waqi: WAQI = await APIRequest(cityInfo.city, 1);
    updateCityInfo({ city: cityInfo.city, aqi: waqi.data.aqi, loaded: true });
  };

  const allCities = [city1Info, city2Info, city3Info];
  const updateCities = [updateCity1Info, updateCity2Info, updateCity3Info];

  for (let i = 0; i < allCities.length; i++) {
    if (!allCities[i].loaded) {
      loadCities(allCities[i], updateCities[i]);
    }
  }

  return (
    <div className="card_container">
      {allCities.map((city) => (
        <div className="card card_block" key={city.city}>
          <img src="..." className="card-img-top" alt={city.city}></img>
          <div className="card-body">
            <h5 className="card-title">{city.city}</h5>
            <p className="card-text">
              AQI:
              <br></br>
              <span
                className={
                  city.aqi == 0
                    ? ""
                    : city.aqi < 50
                    ? "good_air"
                    : city.aqi > 100 && city.aqi < 150
                    ? "medium_air"
                    : "poor_air"
                }
              >
                {city.aqi != 0 ? city.aqi : "Still Loading"}
              </span>
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
