import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Logo from "./components/Logo";
import ImageGraphic from "./components/ImageGraphic";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Background imgPath={"aqiImage"} styling="background">
        <Logo styling="logo" />
        <ImageGraphic imageNum={0} styling="img_graphic"></ImageGraphic>
      </Background>
    </div>
  );
}

export default App;
