import { Navigate, Route, Routes } from "react-router-dom";

import { ColorForm } from "./ColorForm";
import { ColorList } from "./ColorList";
import { FilterColor } from "./FilterColor";
import { SubmitColor } from "./SubmitColor";

export function RouteList() {
  return (
    <Routes>
      <Route path="/colors" element={<ColorList/>} />
      <Route path="/colors/:color" element={<FilterColor/>} />
      <Route path="/colors/new" element={<ColorForm />} />
      <Route path="/colors/submit/:color" element={<SubmitColor />} />
      <Route path="*" element={<Navigate to="/colors" />} />
    </Routes>
  );
}
