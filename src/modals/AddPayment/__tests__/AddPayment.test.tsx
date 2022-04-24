import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import React from "React";
import AddPayment from "../AddPayment";

jest.mock("axios");

describe("AddPaymentModal", () => {
  it("add scenario (NO Data pre-loaded) - inputChange", () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );

    const handleCloseMock = jest.fn();
    const dataMock = {
      id: "",
      name: "",
      username: "",
      title: "",
      value: "",
      date: "",
    };

    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [dataMock, () => null]);

    render(<AddPayment open data={dataMock} handleClose={handleCloseMock} />);
    fireEvent.change(screen.getByTestId("name-add-input"), {
      target: { value: "teste" },
    });
    fireEvent.click(screen.getByTestId("save-payment-btn"));
  });
  it("add scenario (NO Data pre-loaded) - fill form and save", () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );

    const handleCloseMock = jest.fn();
    const dataMock = {
      id: "",
      name: "",
      username: "",
      title: "",
      value: "",
      date: "",
    };

    const stateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [dataMock, () => null]);

    render(<AddPayment open data={dataMock} handleClose={handleCloseMock} />);
    fireEvent.change(screen.getByTestId("name-add-input"), {
      target: { value: "teste" },
    });
    fireEvent.change(screen.getByTestId("username-add-input"), {
      target: { value: "teste" },
    });
    fireEvent.change(screen.getByTestId("title-add-input"), {
      target: { value: "teste" },
    });
    fireEvent.change(screen.getByTestId("value-add-input"), {
      target: { value: -10 },
    });
    fireEvent.click(screen.getByTestId("save-payment-btn"));
  });

  it("edit scenario (All Data pre-loaded)", () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );

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

    render(<AddPayment open data={dataMock} handleClose={handleCloseMock} />);
    fireEvent.click(screen.getByTestId("save-payment-btn"));
    // fireEvent.change(screen.getByTestId("name-add-input"), {
    //   target: { value: "teste" },
    // });
  });

  it("edit scenario (All Data pre-loaded 'no-id')", () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );

    const handleCloseMock = jest.fn();
    const dataMock = {
      id: "",
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

    render(<AddPayment open data={dataMock} handleClose={handleCloseMock} />);
    fireEvent.click(screen.getByTestId("save-payment-btn"));
    // fireEvent.change(screen.getByTestId("name-add-input"), {
    //   target: { value: "teste" },
    // });
  });

  it("edit scenario (All Data pre-loaded)", () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: {},
      })
    );

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

    render(<AddPayment open data={dataMock} handleClose={handleCloseMock} />);
    fireEvent.click(screen.getByTestId("save-payment-btn"));
    // fireEvent.change(screen.getByTestId("name-add-input"), {
    //   target: { value: "teste" },
    // });
  });

});
