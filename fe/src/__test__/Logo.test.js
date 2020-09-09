import React from "react";
import { render } from "@testing-library/react";
import Logo from "../components/Logo/Logo";

describe("Logo", () => {
  it("renders without crash", () => {
    const { getByTestId } = render(<Logo />);
    const logoContainer = getByTestId("logo");
    expect(logoContainer).toBeInTheDocument();
  });
});
