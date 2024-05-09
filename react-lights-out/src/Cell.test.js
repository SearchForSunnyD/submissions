import { render } from "@testing-library/react";
import React from "react";
import Cell from "./Cell";

it("renders without crashing", () => {
  render(<Cell isLit={true} flipCellsAroundMe={() => true} />);
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Cell isLit={true} flipCellsAroundMe={() => true} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
