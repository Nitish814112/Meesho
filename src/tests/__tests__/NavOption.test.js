import "@testing-library/jest-dom";
import NavOption from "../../component/NavOptions/NavOption.jsx";
import { render, screen } from "@testing-library/react";
test('renders "Women Ethnic" category', () => {
  render(<NavOption />);

  expect(screen.getByText("Women Ethnic")).toBeInTheDocument();
});