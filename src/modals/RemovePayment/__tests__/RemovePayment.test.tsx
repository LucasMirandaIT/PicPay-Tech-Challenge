import { fireEvent, render, screen } from "@testing-library/react";
import React from "React";
import RemovePayment from "../RemovePayment";

describe("AddPaymentModal", () => {
  it("edit scenario (All Data pre-loaded)", () => {
    const handleCloseMock = jest.fn();
    const dataMock = {
      id: "1",
      name: "Jane Doe",
      username: "jane123",
      title: "Payment 1",
      value: "1000.90",
      date: "2022-02-02T00:00:00Z",
    };

    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [dataMock, () => null]);

    render(
      <RemovePayment open data={dataMock} handleClose={handleCloseMock} />
    );
    fireEvent.click(screen.getByTestId("cancel-btn-remove-modal"));
    // fireEvent.change(screen.getByTestId("name-add-input"), {
    //   target: { value: "teste" },
    // });
  });

  it("edit scenario (All Data pre-loaded)", () => {
    const handleCloseMock = jest.fn();
    const dataMock = {
      id: "",
      name: "",
      username: "jane123",
      title: "Payment 1",
      value: "1000.90",
      date: "2022-02-02T00:00:00Z",
    };
    const valuesMock = {
      id: "1",
      name: "Jane Doe",
      username: "jane123",
      title: "Payment 1",
      value: "1000.90",
      date: "2022-02-02T00:00:00Z",
    };

    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [dataMock, () => null]);

    render(
      <RemovePayment open data={dataMock} handleClose={handleCloseMock} />
    );
    fireEvent.click(screen.getByTestId("remove-payment-btn"));
    // fireEvent.change(screen.getByTestId("name-add-input"), {
    //   target: { value: "teste" },
    // });
  });
});
