import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Coin from "./Coin";

it("reders without crashing", () => {
  render(<Coin />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Coin />);
  expect(asFragment()).toMatchSnapshot();
});

it("has no image before flip", function () {
  const { container } = render(<Coin />);
  expect(container.querySelector('img[alt="coin"]')).not.toBeInTheDocument();
})

it("has an image after flip", function () {
  const { container } = render(<Coin />);
  const flip = container.querySelector(".flipCoin")
  fireEvent.click(flip)

  expect(container.querySelector('img[alt="coin"]')).toBeInTheDocument();
});
