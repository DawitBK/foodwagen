import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FoodCard from "../components/FoodCard";
import { Food } from "../types/food";
import foodReducer from "../store/foodSlice";

const mockFood: Food = {
  id: "1",
  name: "Burger",
  rating: 4,
  price: "12",
  image: "/placeholder-food.svg",
  restaurant: {
    name: "Diner",
    logo: "/placeholder-food.svg",
    status: "Open Now",
  },
};

const createMockStore = () => {
  return configureStore({
    reducer: {
      food: foodReducer,
    },
  });
};

describe("FoodCard", () => {
  test("renders food card with props", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <FoodCard food={mockFood} />
      </Provider>
    );
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Diner")).toBeInTheDocument();
    expect(screen.getByText("Open Now")).toBeInTheDocument();
    expect(screen.getByText("$12")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("opens delete modal and shows confirmation", async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <FoodCard food={mockFood} />
      </Provider>
    );

    // Click menu button to show options
    fireEvent.click(screen.getByTestId("food-menu-btn"));

    // Click delete button
    fireEvent.click(screen.getByTestId("food-delete-btn"));

    // Check if modal opens
    expect(
      screen.getByText(/Are you sure you want to remove Burger/i)
    ).toBeInTheDocument();

    // Check that delete button is present
    expect(screen.getByTestId("food-confirm-delete-btn")).toBeInTheDocument();
  });
});
