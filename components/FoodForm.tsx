"use client";

import React, { useState } from "react";
import { Food } from "../types/food";
import * as api from "../app/api/food";

type Props = {
  initialData?: Food;
  onSuccess?: () => void;
  onCancel?: () => void;
};

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function FoodForm({ initialData, onSuccess, onCancel }: Props) {
  const priceValue = initialData?.price;
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(
    typeof priceValue === "number" ? priceValue.toString() : priceValue || ""
  );
  const [rating, setRating] = useState(initialData?.rating?.toString() || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [restaurantName, setRestaurantName] = useState(
    initialData?.restaurant?.name || ""
  );
  const [restaurantLogo, setRestaurantLogo] = useState(
    initialData?.restaurant?.logo || ""
  );
  const [restaurantStatus, setRestaurantStatus] = useState(
    initialData?.restaurant?.status || "Open Now"
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e["food-name-error"] = "Food Name is required";
    const r = Number(rating);
    if (rating === "" || Number.isNaN(r) || r < 1 || r > 5)
      e["food-rating-error"] = "Food Rating must be a number";
    if (!image.trim() || !isValidUrl(image))
      e["food-image-error"] = "Food Image URL is required";
    if (!restaurantName.trim())
      e["restaurant-name-error"] = "Restaurant Name is required";
    if (!restaurantLogo.trim() || !isValidUrl(restaurantLogo))
      e["restaurant-logo-error"] = "Restaurant Logo URL is required";
    if (!["Open Now", "Closed"].includes(restaurantStatus))
      e["restaurant-status-error"] =
        'Restaurant Status must be "Open Now" or "Closed"';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const payload: Partial<Food> = {
        name,
        price,
        rating: Number(rating),
        image,
        restaurant: {
          name: restaurantName,
          logo: restaurantLogo,
          status: restaurantStatus as "Open Now" | "Closed",
        },
      };
      if (initialData) {
        await api.updateFood(initialData.id, payload);
      } else {
        await api.createFood(payload);
      }
      onSuccess && onSuccess();
      setName("");
      setPrice("");
      setRating("");
      setImage("");
      setRestaurantName("");
      setRestaurantLogo("");
      setRestaurantStatus("Open Now");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save food item";
      alert(errorMessage);
      console.error("Food save error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="food-form"
      onSubmit={handleSubmit}
      data-test-id="food-form"
    >
      <div>
        <label className="food-label" htmlFor="food-name-input">
          Food Name
        </label>
        <input
          id="food-name-input"
          name="food_name"
          className="food-input"
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby={
            errors["food-name-error"] ? "food-name-error" : undefined
          }
        />
        {errors["food-name-error"] && (
          <div id="food-name-error" className="text-red-600 text-sm">
            {errors["food-name-error"]}
          </div>
        )}
      </div>

      <div>
        <label className="food-label" htmlFor="food-price-input">
          Food Price
        </label>
        <input
          id="food-price-input"
          name="food_price"
          className="food-input"
          type="number"
          step="0.01"
          placeholder="Food price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label className="food-label" htmlFor="food-rating-input">
          Food Rating
        </label>
        <input
          id="food-rating-input"
          name="food_rating"
          type="number"
          min={1}
          max={5}
          className="food-input"
          placeholder="Food rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          aria-describedby={
            errors["food-rating-error"] ? "food-rating-error" : undefined
          }
        />
        {errors["food-rating-error"] && (
          <div id="food-rating-error" className="text-red-600 text-sm">
            {errors["food-rating-error"]}
          </div>
        )}
      </div>

      <div>
        <label className="food-label" htmlFor="food-image-input">
          Food Image URL
        </label>
        <input
          id="food-image-input"
          name="food_image"
          className="food-input"
          placeholder="Food image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          aria-describedby={
            errors["food-image-error"] ? "food-image-error" : undefined
          }
        />
        {errors["food-image-error"] && (
          <div id="food-image-error" className="text-red-600 text-sm">
            {errors["food-image-error"]}
          </div>
        )}
      </div>

      <div>
        <label className="food-label" htmlFor="restaurant-name-input">
          Restaurant Name
        </label>
        <input
          id="restaurant-name-input"
          name="restaurant_name"
          className="food-input"
          placeholder="Restaurant name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          aria-describedby={
            errors["restaurant-name-error"]
              ? "restaurant-name-error"
              : undefined
          }
        />
        {errors["restaurant-name-error"] && (
          <div id="restaurant-name-error" className="text-red-600 text-sm">
            {errors["restaurant-name-error"]}
          </div>
        )}
      </div>

      <div>
        <label className="food-label" htmlFor="restaurant-logo-input">
          Restaurant Logo URL
        </label>
        <input
          id="restaurant-logo-input"
          name="restaurant_logo"
          className="food-input"
          placeholder="Restaurant logo URL"
          value={restaurantLogo}
          onChange={(e) => setRestaurantLogo(e.target.value)}
          aria-describedby={
            errors["restaurant-logo-error"]
              ? "restaurant-logo-error"
              : undefined
          }
        />
        {errors["restaurant-logo-error"] && (
          <div id="restaurant-logo-error" className="text-red-600 text-sm">
            {errors["restaurant-logo-error"]}
          </div>
        )}
      </div>

      <div>
        <label className="food-label" htmlFor="restaurant-status-select">
          Restaurant Status
        </label>
        <select
          id="restaurant-status-select"
          name="restaurant_status"
          className="food-input"
          value={restaurantStatus}
          onChange={(e) =>
            setRestaurantStatus(e.target.value as "Open Now" | "Closed")
          }
          aria-describedby={
            errors["restaurant-status-error"]
              ? "restaurant-status-error"
              : undefined
          }
        >
          <option>Open Now</option>
          <option>Closed</option>
        </select>
        {errors["restaurant-status-error"] && (
          <div id="restaurant-status-error" className="text-red-600 text-sm">
            {errors["restaurant-status-error"]}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <button type="submit" className="food-btn" disabled={submitting}>
          {submitting && <span className="food-spinner" aria-hidden="true" />}
          {submitting
            ? initialData
              ? "Updating Food..."
              : "Adding Food..."
            : initialData
            ? "Save Changes"
            : "Save Food"}
        </button>
        <button
          type="button"
          className="food-btn-outline"
          onClick={() => onCancel && onCancel()}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
