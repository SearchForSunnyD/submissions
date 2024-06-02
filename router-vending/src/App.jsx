import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VendingMachine } from "./VendingMachine";
import { Item } from "./Item";
import { Navbar } from "./Navbar";

import data from "./assets/data.json";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<VendingMachine />} path="/" />
          <Route element={<Item data={data.chips} />} path="/chips" />
          <Route element={<Item data={data.chocolate} />} path="/chocolate" />
          <Route element={<Item data={data.gum} />} path="/gum" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
