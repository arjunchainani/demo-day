import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Logo from "./components/Logo";
import ImageGraphic from "./components/ImageGraphic";
import ScrollButton from "./components/ScrollButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Background styling="background background1" id="home_bg">
        <Logo styling="logo" />
        <ImageGraphic imageNum={0} styling="img_graphic"></ImageGraphic>
        <ScrollButton direction={1} href="#main_bg" />
      </Background>
      <Background styling="background background2" id="main_bg">
        <></>
      </Background>
    </div>
  );
}

export default App;
