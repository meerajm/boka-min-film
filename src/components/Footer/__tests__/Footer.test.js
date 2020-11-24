import React from "react";
import { render } from "@testing-library/react";
import Footer from "../index";

describe("Testing Footer Component", () => {
  test("render footer component", () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId("footer")).toBeInTheDocument();
  });
});