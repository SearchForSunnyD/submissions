import { Navigate, Route, Routes } from "react-router-dom";

import { DogList } from "./DogList";
import { FilterDogDetails } from "./FilterDogDetails";

export function RouteList({ dogs }) {
  return (
    <Routes>
      <Route path="/dogs" element={<DogList dogs={dogs} />} />
      <Route path="/dogs/:name" element={<FilterDogDetails dogs={dogs} />} />
      <Route path="/" element={<Navigate to="/dogs" />} />
    </Routes>
  );
}
