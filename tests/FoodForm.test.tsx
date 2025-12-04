import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FoodForm from "../components/FoodForm";
import * as api from "../app/api/food";

jest.mock("../app/api/food", () => ({
  createFood: jest.fn(),
  updateFood: jest.fn(),
}));

describe("FoodForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<FoodForm />);

    await user.click(screen.getByRole("button", { name: /save food/i }));

    expect(
      await screen.findByText("Food Name is required")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Food Rating must be a number")
    ).toBeInTheDocument();
    expect(screen.getByText("Food Image URL is required")).toBeInTheDocument();
    expect(screen.getByText("Restaurant Name is required")).toBeInTheDocument();
    expect(
      screen.getByText("Restaurant Logo URL is required")
    ).toBeInTheDocument();
  });

  test("submits payload when form is valid", async () => {
    const user = userEvent.setup();
    const mockedCreateFood = api.createFood as jest.MockedFunction<
      typeof api.createFood
    >;
    mockedCreateFood.mockResolvedValue({ id: "99" } as any);
    const onSuccess = jest.fn();

    render(<FoodForm onSuccess={onSuccess} />);

    // Fill out the form
    await user.type(screen.getByLabelText("Food Name"), "Pizza");
    await user.type(screen.getByLabelText("Food Price"), "19.99");
    await user.type(screen.getByLabelText("Food Rating"), "4");
    await user.type(
      screen.getByLabelText("Food Image URL"),
      "https://cdn.test/pizza.png"
    );
    await user.type(screen.getByLabelText("Restaurant Name"), "Pizza Place");
    await user.type(
      screen.getByLabelText("Restaurant Logo URL"),
      "https://cdn.test/logo.png"
    );

    // Select status
    const statusSelect = screen.getByLabelText("Restaurant Status");
    await user.selectOptions(statusSelect, "Open Now");

    await user.click(screen.getByRole("button", { name: /save food/i }));

    await waitFor(() => expect(mockedCreateFood).toHaveBeenCalled());

    // Check payload
    expect(mockedCreateFood).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Pizza",
        price: "19.99",
        rating: 4,
        image: "https://cdn.test/pizza.png",
        restaurant: {
          name: "Pizza Place",
          logo: "https://cdn.test/logo.png",
          status: "Open Now",
        },
      })
    );

    expect(onSuccess).toHaveBeenCalled();
  });
});
