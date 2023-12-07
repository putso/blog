import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Article from "./components/Article";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header></Header>
      <Article></Article>
    </div>
  );
}

export default App;
