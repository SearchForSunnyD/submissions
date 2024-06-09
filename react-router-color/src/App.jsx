import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { NavBar } from "./NavBar";
import { RouteList } from "./RouteList";

export default function App() {
  

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <RouteList/>
      </BrowserRouter>
    </>
  );
}
