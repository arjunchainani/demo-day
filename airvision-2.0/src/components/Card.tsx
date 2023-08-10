import { useState } from "react";
import APIRequest from "../../backend/fetch";
import GeoApify from "../../backend/interfaces";

interface Props {
  cities: string[];
}

const Card = ({ cities }: Props) => {
  // Three state variables to keep track of three popular cities info
  const [city1Info, updateCity1Info] = useState({});
  const [city2Info, updateCity2Info] = useState("");
  const [city3Info, updateCity3Info] = useState("");

  const loadCities = async (city: string) => {
    let result: GeoApify = await APIRequest("Paris", 0);
    let placeID = result.results[0].place_id;
  };

  return (
    <div className="card_container">
      {cities.map((cityName: string) => (
        <div className="card card_block" key={cityName}>
          <img src="..." className="card-img-top" alt={cityName}></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
