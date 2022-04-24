import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React from "react";
import { act } from "react-dom/test-utils";
import CustomSnackbar from "../../../components/CustomSnackbar/CustomSnackbar";
import { userServices } from "../../../services/User";
import Login from "../LoginPage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios");

describe("LoginPage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });
  it("Render login page without user logged", () => {
    jest.spyOn(window.sessionStorage, "setItem");

    window.sessionStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        username: "user",
        name: "Usuario",
        email: "usuario@user.com",
      })
    );

    render(<Login />);
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
  it("Test Form Validation failed", async () => {
    await act(async () => {
      render(<Login />);
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId("login-button"));
    });
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
  it("Test Form Validation succeeded (!ShowPassword)", async () => {
    const stateMock = jest.fn();
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [{ email: "usuario@gmail.com", password: "usuario" }],
      })
    );
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => [
        {
          email: "usuario@gmail.com",
          password: "usuario",
        },
        () => null,
      ])
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    render(<Login />);
  });
  it("Test Form Validation succeeded (ShowPassword)", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [{ email: "usuario@gmail.com", password: "usuario" }],
      })
    );
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementationOnce(() => [
        {
          email: "usuario@gmail.com",
          password: "usuario",
        },
        () => null,
      ])
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    render(<Login />);
    // await act(async () => {
    fireEvent.click(screen.getByTestId("login-button"));
    // });
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
  it("Test Form Validation succeeded (ShowPassword)", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [{ email: "usuario@hotmail.com", password: "user123" }],
      })
    );
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementationOnce(() => [
        {
          email: "usuario@gmail.com",
          password: "usuario",
        },
        () => null,
      ])
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    render(<Login />);
    // await act(async () => {
    fireEvent.click(screen.getByTestId("login-button"));
    // });
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("Test Change Inputs", async () => {
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementationOnce(() => [
        {
          email: "usuario@gmail.com",
          password: "usuario",
        },
        () => null,
      ])
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    const result = render(<Login />);
    // await act(async () => {
    fireEvent.change(result.container.querySelector("#login-input"), {
      target: { value: "teste" },
    });
    fireEvent.change(result.container.querySelector("#psswd-input"), {
      target: { value: "123" },
    });
    // });
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
});
