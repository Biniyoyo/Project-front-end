import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

test("Unauthorized user", () => {
	render(<App />);
	// const linkElement = screen.getByTestId("login");
	// expect(linkElement).toBeInTheDocument();
});
