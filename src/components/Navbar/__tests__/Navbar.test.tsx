import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Navbar from "../Navbar";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("NavBar", () => {
  it("Render NavBar", () => {
    jest.spyOn(window.sessionStorage, "setItem");

    window.sessionStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        username: "user",
        name: "Usuario",
        email: "usuario@user.com",
      })
    );
    render(<Navbar />);
  });

  it("Open Menu", () => {
    jest.spyOn(window.sessionStorage, "setItem");

    window.sessionStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        username: "user",
        name: "Usuario",
        email: "usuario@user.com",
      })
    );
    render(<Navbar />);

    fireEvent.click(screen.getByTestId("avatar-group"));

    fireEvent.click(screen.getByTestId("navbar-menu-backdrop"));
  });
  it("Logout Button", () => {
    jest.spyOn(window.sessionStorage, "setItem");

    window.sessionStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        username: "user",
        name: "Usuario",
        email: "usuario@user.com",
      })
    );
    render(<Navbar />);

    fireEvent.click(screen.getByTestId("logout-button"));
  });
});
