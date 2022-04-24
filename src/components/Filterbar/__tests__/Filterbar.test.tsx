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


  it("clear filters", () => {
    const handleFiltersMock = jest.fn();
    const toggleCollapseFilterbar = jest.fn();
    const dataMock = {
      username: "User01",
      title: "Title",
      value_lte: "",
      value_gte: "",
      isPaid: "",
      date_gte: "",
      date_lte: "",
    };
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [dataMock, () => null])
      .mockImplementation((x: any) => [x, () => null]);

    render(<FilterBar handleFilters={handleFiltersMock} />);
    fireEvent.click(screen.getByTestId("filters-btn"));
    setTimeout(() => {
      fireEvent.click(screen.getByTestId("clear-filters-btn"));
    }, 1000);
  });
  it("send filters", () => {
    const handleFiltersMock = jest.fn();
    const dataMock = {
      username: "User01",
      title: "Title",
      value_lte: "",
      value_gte: "",
      isPaid: "",
      date_gte: "",
      date_lte: "",
    };
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [dataMock, () => null])
      .mockImplementation((x: any) => [x, () => null]);

    render(<FilterBar handleFilters={handleFiltersMock} />);
    fireEvent.click(screen.getByTestId("filters-btn"));
    setTimeout(() => {
      fireEvent.click(screen.getByTestId("send-filters-btn"));
    }, 1000);
  });
});
