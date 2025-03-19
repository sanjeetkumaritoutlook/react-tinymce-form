import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";
import "@testing-library/jest-dom";

describe("ErrorMessage Component", () => {
  test("renders the error message text", () => {
    const testMessage = "This is an error!";
    render(<ErrorMessage message={testMessage} />);

    // Check if the message is displayed
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test("renders the InfoOutlinedIcon", () => {
    render(<ErrorMessage message="Error occurred" />);

    // Check if the icon is present
    const iconElement = screen.getByTestId("InfoOutlinedIcon");
    expect(iconElement).toBeInTheDocument();
  });
});
