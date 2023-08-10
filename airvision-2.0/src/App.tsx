import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// Components
import Background from "./components/Background";
import Logo from "./components/Logo";
import ImageGraphic from "./components/ImageGraphic";
import ScrollButton from "./components/ScrollButton";
import Card from "./components/Card";

// Backend
import APIRequest from "./../backend/fetch";
import GeoApify from "../backend/interfaces";

function App() {
  const popularCities = ["New York", "Shanghai", "Paris"];

  return (
    <div>
      <Background styling="background background1" id="home_bg">
        <Logo styling="logo" />
        <ImageGraphic imageNum={0} styling="img_graphic"></ImageGraphic>
        <ScrollButton direction={1} href="#main_bg" />
      </Background>
      <Background styling="background background2" id="main_bg">
        {/* <button
          onClick={async () => {
            let result = await APIRequest("New York", 0);
            console.log(result);
          }}
        ></button> */}
        <div className="popular_title">
          <h1 className="popular_title_h1">Popular Searches</h1>
        </div>
        <Card cities={popularCities}></Card>
      </Background>
    </div>
  );
}

export default App;
