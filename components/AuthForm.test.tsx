import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthForm } from "./AuthForm";

//mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    prefetch: () => null,
  }),
  usePathname: () => "/",
}));

// SIGN UP
describe("Test Signup form", () => {
  beforeAll(() => render(<AuthForm />));

  it("should render the signup form", () => {
    const cardTitle = screen.getByTestId("card-title");
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle.textContent).toBe("Signup");
  });
});

// LOG IN
describe("Test Login form", () => {
  beforeAll(() => render(<AuthForm isLogIn />));

  it("should render the login form", () => {
    const cardTitle = screen.getByTestId("card-title");
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle.textContent).toBe("Login");
  });
});

// RESET PASSWORD
describe("Test reset password form", () => {
  beforeAll(() => render(<AuthForm isForgotPassword />));

  it("should render the reset password form", () => {
    const cardTitle = screen.getByTestId("card-title");
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle.textContent).toBe("Reset Password");
  });
});
