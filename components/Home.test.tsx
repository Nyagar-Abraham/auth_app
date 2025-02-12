import Home from "@/app/(root)/Home/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

// function sum(a: number, b: number) {
//   return a + b;
// }

// let data = [];

// beforeAll(() => {
//   console.log("beforeAll");
// });

// // afterAll  afterEach

// beforeEach(() => {
//   console.log("beforeEach");
//   data = [2, 3, 4, 5];
// });

// test("add 2+3 should be equal to 5", () => {
//   expect(sum(2, 3)).toBe(5);
//   expect(sum(3, 3)).not.toBe(5);
// });

// test("object assignment", () => {
//   const data: any = { one: 1 };
//   data["two"] = 2;
//   expect(data).toEqual({ one: 1, two: 2 });
// });

// test('there is a "stop" in christopher', () => {
//   expect("christopher").toMatch(/stop/);
// });

// async function getResponse() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ value: "Hello world" });
//     }, 100);
//   });
// }

// describe("combine promise response value", () => {
//   test("async getResponse should return Hello world", async () => {
//     const response = await getResponse();
//     expect(response).toEqual({ value: "Hello world" });
//   });

//   test("async getResponse should not return abcd", async () => {
//     const response = await getResponse();
//     expect(response).not.toEqual({ value: "abcd" });
//   });
// });

// describe("Testing Home component", () => {
//   beforeEach(() => {
//     render(<Home />);
//   });

//   it("should render a heading", () => {
//     const text = screen.getByText(/Home/i);
//     expect(text).toBeInTheDocument();
//   });

//   it("should render a heading", () => {
//     const text = screen.getByRole("heading", { level: 1 });
//     expect(text).toBeInTheDocument();
//   });

//   it("test the desription", () => {
//     const text = screen.getByTestId("desc");
//     expect(text.textContent).toMatch(/Description/i);
//   });
// });

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

test("test navigation to another route", () => {
  const mockPush = jest.fn();

  useRouter.mockReturnValue({
    push: mockPush,
  });

  render(<Home />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(mockPush).toHaveBeenCalledWith("/dashboard");
});
