import { render } from "@testing-library/react";
import Deck from "./Deck";

define("renders without crashing", () => {
  render(<Deck />);
});
