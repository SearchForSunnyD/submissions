import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Board from "./Board";

it("renders without crashing", () => {
  render(<Board />);
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Board nrows={1} ncols={1} chanceLightStartsOn={1} />,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays a win if won", () => {
  const { container } = render(
    <Board nrows={1} ncols={1} chanceLightStartsOn={0} />,
  );
  expect(container.querySelector("h1")).toBeInTheDocument();
});

it("updates cell", () => {
  const { container } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={1} />,
  );

  const firstCell = container.querySelectorAll("td.Cell");

  expect(firstCell[0].className).toBe('Cell Cell-lit');

  fireEvent.click(firstCell[0]);

  expect(firstCell[0].className).toBe("Cell ");
});
