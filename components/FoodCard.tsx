"use client";

import React, { useState } from "react";
import { Food } from "../types/food";
import Modal from "./Modal";
import FoodForm from "./FoodForm";
import { useAppDispatch } from "../store/hooks";
import { deleteFood, fetchFoods } from "../store/foodSlice";

export default function FoodCard({ food }: { food: Food }) {
  const dispatch = useAppDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  async function handleDelete() {
    try {
      setDeleteLoading(true);
      await dispatch(deleteFood(food.id)).unwrap();
      setOpenDelete(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete food item";
      alert(errorMessage);
      console.error("Food delete error:", err);
    } finally {
      setDeleteLoading(false);
    }
  }

  const status = food.restaurant?.status || "Unknown";
  const statusClass =
    status === "Open Now"
      ? "food-status-open"
      : status === "Closed"
      ? "food-status-closed"
      : "food-status-unknown";

  const priceValue = food.price;
  const displayPrice =
    priceValue === undefined || priceValue === null || priceValue === ""
      ? ""
      : typeof priceValue === "number"
      ? `$${priceValue}`
      : `${priceValue}`.startsWith("$")
      ? `${priceValue}`
      : `$${priceValue}`;

  return (
    <article className="food-card group relative" data-test-id="food-card">
      {/* Image Section */}
      <div className="relative h-48 w-full mb-12">
        <img
          src={food.image || "/placeholder-food.svg"}
          alt={food.name}
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Price Tag Overlay */}
        <div className="food-price">{displayPrice}</div>
        {/* Restaurant Logo Overlay */}
        <img
          src={food.restaurant?.logo || "/placeholder-food.svg"}
          alt={food.restaurant?.name}
          className="restaurant-logo"
        />
      </div>

      {/* Content Section */}
      <div className="pt-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="food-name">{food.name}</h3>
            <div className="restaurant-name mt-1">
              {food.restaurant?.name || "No restaurant"}
            </div>
          </div>

          {/* 3-Dot Menu */}
          <div className="relative">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition"
              onClick={() => setShowMenu(!showMenu)}
              data-test-id="food-menu-btn"
              title="Options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-xl z-50 border border-gray-200 py-2">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                    setOpenEdit(true);
                  }}
                >
                  ✏️ Edit Food
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setShowMenu(false);
                    setOpenDelete(true);
                  }}
                  data-test-id="food-delete-btn"
                >
                  🗑️ Delete Food
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="food-rating">
            <span>⭐</span> {food.rating ?? "N/A"}
          </div>
          <div className={`restaurant-status ${statusClass}`}>{status}</div>
        </div>
      </div>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <FoodForm
          initialData={food}
          onSuccess={() => {
            setOpenEdit(false);
            dispatch(fetchFoods());
          }}
          onCancel={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onClose={() => (!deleteLoading ? setOpenDelete(false) : null)}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Delete Food</h3>
          <p className="text-gray-600">
            Are you sure you want to remove {food.name}? This action cannot be
            undone.
          </p>
          <div className="flex gap-2">
            <button
              className="food-btn-danger"
              onClick={handleDelete}
              disabled={deleteLoading}
              data-test-id="food-confirm-delete-btn"
            >
              {deleteLoading && (
                <span className="food-spinner" aria-hidden="true" />
              )}
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              className="food-btn-outline"
              onClick={() => setOpenDelete(false)}
              disabled={deleteLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </article>
  );
}
