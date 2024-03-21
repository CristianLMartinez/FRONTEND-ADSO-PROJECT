import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Test", () => {

  beforeEach(() => {
    render(<Button variant="light" content="button" />);
  });

  test("Button render succesfully", () => {
    expect(screen.getByText("button")).toBeDefined();
  })




});
