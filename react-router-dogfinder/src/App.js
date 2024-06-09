import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import { NavBar } from "./NavBar";
import { RouteList } from "./RouteList";

function App() {

  const [dogs, setDogs] = useState({
    data: [],
    isLoaded: false
  })

  useEffect(() => {
    async function getDogs() {
      const res = await axios.get("http://localhost:5001/dogs");

      setDogs({
        data: res.data,
        isLoaded: true
      })
    }
    getDogs();
  }, [])

  if(!dogs.isLoaded) return <h1>Please Wait</h1>

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar dogs={dogs.data} />
        <div>
          <RouteList dogs={dogs} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
