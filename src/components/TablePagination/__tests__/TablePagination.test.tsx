import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import TablePagination from "../TablePagination";

describe("TablePagination", () => {
  it("render TablePagination", () => {
    const pageChangeMock = jest.fn();
    render(
      <TablePagination
        onPageChange={pageChangeMock}
        totalCount={100}
        currentPage={1}
        pageSize={10}
      />
    );
  });
  it("render TablePagination currentPage !== 1 and change pages using prev/next arrows", () => {
    const pageChangeMock = jest.fn();
    render(
      <TablePagination
        onPageChange={pageChangeMock}
        totalCount={100}
        currentPage={3}
        pageSize={10}
      />
    );
    fireEvent.click(screen.getByTestId("pagination-back-btn"));
    fireEvent.click(screen.getByTestId("pagination-next-btn"));
  });
  it("render TablePagination currentPage == lastPage and go back to first page", () => {
    const pageChangeMock = jest.fn();
    render(
      <TablePagination
        onPageChange={pageChangeMock}
        totalCount={100}
        currentPage={10}
        pageSize={10}
      />
    );
    fireEvent.click(screen.getByTestId("pagination-pill-1"))
  });

  it("render TablePagination currentPage == lastPage and go back to first page", () => {
    const pageChangeMock = jest.fn();
    render(
      <TablePagination
        onPageChange={pageChangeMock}
        totalCount={500}
        currentPage={10}
        pageSize={10}
      />
    );
    fireEvent.click(screen.getByTestId("pagination-pill-1"))
  });
});
