import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import PaymentsPage from "../PaymentsPage";

import { paymentsServices } from "../../../services/Payments";

describe("PaymentsPage", () => {
  it("test rendering", () => {
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [[], () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["desc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    render(<PaymentsPage />);
  });

  it("test rendering", () => {
    const paymentsMock = [
      {
        id: 7,
        name: "Lonna Bonney",
        username: "lbonney6",
        title: "Media Planner Jr",
        value: "2885.86",
        date: "2020-10-02T23:04:57Z",
        isPaid: true,
      },
    ];
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [paymentsMock, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["asc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    render(<PaymentsPage />);

    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.click(screen.getByTestId("delete-button"));
  });

  it("test header asc", () => {
    const paymentsMock = [
      {
        id: 7,
        name: "Lonna Bonney",
        username: "lbonney6",
        title: "Media Planner Jr",
        value: "2885.86",
        date: "2020-10-02T23:04:57Z",
        isPaid: true,
      },
    ];
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [paymentsMock, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["asc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    const comp = render(<PaymentsPage />);
    fireEvent.click(screen.getByTestId("header-username"));
  });
  it("test header desc", () => {
    const paymentsMock = [
      {
        id: 7,
        name: "Lonna Bonney",
        username: "lbonney6",
        title: "Media Planner Jr",
        value: "2885.86",
        date: "2020-10-02T23:04:57Z",
        isPaid: true,
      },
    ];
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [paymentsMock, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["desc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    render(<PaymentsPage />);
    fireEvent.click(screen.getByTestId("header-username"));
  });

  xit("checkbox change fetch", () => {
    const paymentsMock = [
      {
        id: 7,
        name: "Lonna Bonney",
        username: "lbonney6",
        title: "Media Planner Jr",
        value: "2885.86",
        date: "2020-10-02T23:04:57Z",
        isPaid: false,
      },
    ];
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [paymentsMock, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["desc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    jest.mock("../../../services/Payments", () => {
      const mockedService = {
        getPayments: jest.fn(),
        updatePayment: jest.fn(),
        removePayment: jest.fn(),
        createPayment: jest.fn(),
      };
      return {
        paymentsServices: jest.fn(() => mockedService),
      };
    });

    render(<PaymentsPage />);
    fireEvent.change(screen.getByTestId("checkbox-7"));
  });

  it("open add payment Modal", () => {
    const paymentsMock = [
      {
        id: 7,
        name: "Lonna Bonney",
        username: "lbonney6",
        title: "Media Planner Jr",
        value: "2885.86",
        date: "2020-10-02T23:04:57Z",
        isPaid: false,
      },
    ];
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [paymentsMock, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["desc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    jest.mock("../../../services/Payments", () => {
      const mockedService = {
        getPayments: jest.fn(),
        updatePayment: jest.fn(),
        removePayment: jest.fn(),
        createPayment: jest.fn(),
      };
      return {
        paymentsServices: jest.fn(() => mockedService),
      };
    });

    render(<PaymentsPage />);
    // MuiBackdrop-root
    fireEvent.click(screen.getByTestId("cancel-button"));
  });
  it("open remove payment Modal", () => {
    const paymentsMock = [
      {
        id: 7,
        name: "Lonna Bonney",
        username: "lbonney6",
        title: "Media Planner Jr",
        value: "2885.86",
        date: "2020-10-02T23:04:57Z",
        isPaid: false,
      },
    ];
    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [paymentsMock, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [1, () => null])
      .mockImplementationOnce(() => [10, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["desc", () => null])
      .mockImplementationOnce(() => ["username", () => null])
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementation((x: any) => [x, stateMock]);

    jest.mock("../../../services/Payments", () => {
      const mockedService = {
        getPayments: jest.fn(),
        updatePayment: jest.fn(),
        removePayment: jest.fn(),
        createPayment: jest.fn(),
      };
      return {
        paymentsServices: jest.fn(() => mockedService),
      };
    });

    render(<PaymentsPage />);
    fireEvent.click(screen.getByTestId("cancel-btn-remove-modal"));
  });
});
