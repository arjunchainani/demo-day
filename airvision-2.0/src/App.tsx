import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Logo from "./components/Logo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Background imgPath="./assets/background.svg" styling="background">
        <Logo styling="logo" />
      </Background>
    </div>
  );
}

export default App;
