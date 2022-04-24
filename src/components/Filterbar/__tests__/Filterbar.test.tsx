import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import FilterBar from "../Filterbar";

describe("FilterBar", () => {
  it("render Filterbar collapsed", () => {
    const handleFiltersMock = jest.fn();
    render(<FilterBar handleFilters={handleFiltersMock} />);
  });
  it("render Filterbar expanded", () => {
    const handleFiltersMock = jest.fn();
    render(<FilterBar handleFilters={handleFiltersMock} />);
    fireEvent.click(screen.getByTestId("filters-btn"));
  });

  it("render Filterbar expanded clearFilter()", () => {
    const handleFiltersMock = jest.fn();
    render(<FilterBar handleFilters={handleFiltersMock} />);
    fireEvent.click(screen.getByTestId("filters-btn"));

    fireEvent.click(screen.getByTestId("clear-filters-btn"));
  });

  it("render Filterbar expanded sendFilters()", () => {
    const handleFiltersMock = jest.fn();
    render(<FilterBar handleFilters={handleFiltersMock} />);
    fireEvent.click(screen.getByTestId("filters-btn"));

    fireEvent.click(screen.getByTestId("send-filters-btn"));
  });

  it("render Filterbar expanded change values", () => {
    const handleFiltersMock = jest.fn();

    render(<FilterBar handleFilters={handleFiltersMock} />);
    fireEvent.click(screen.getByTestId("filters-btn"));

    fireEvent.change(screen.getByTestId("username-filter-input"), {
      target: { value: "teste" },
    });
  });
});
