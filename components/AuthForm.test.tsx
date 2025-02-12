import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/AuthForm";

// Mocking dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("AuthForm Component", () => {
  const mockRouterPush = jest.fn();
  const mockToast = jest.fn();
  const mockLogin = jest.fn();
  const mockSignup = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useAuth as jest.Mock).mockReturnValue({
      loading: false,
      login: mockLogin,
      signup: mockSignup,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call login and redirect to dashboard on successful login", async () => {
    mockLogin.mockResolvedValue({ status: "success" });

    render(<AuthForm isLogIn={true} />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    );

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Welcome!",
        variant: "default",
      })
    );
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should show error toast on failed login", async () => {
    mockLogin.mockResolvedValue({
      status: "error",
      error: "Invalid credentials",
    });

    render(<AuthForm isLogIn={true} />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Something went wrong",
        description: "Invalid credentials",
      })
    );
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("should call signup and redirect to dashboard on successful signup", async () => {
    mockSignup.mockResolvedValue({ status: "success" });

    render(<AuthForm isLogIn={false} />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    await waitFor(() =>
      expect(mockSignup).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test@example.com",
        password: "password123",
        passwordConfirm: "password123",
      })
    );

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Welcome!",
        variant: "default",
      })
    );
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should show error toast on failed signup", async () => {
    mockSignup.mockResolvedValue({
      status: "error",
      error: "Email already in use",
    });

    render(<AuthForm isLogIn={false} />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Something went wrong",
        description: "Email already in use",
      })
    );
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
