"use client";

import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import FoodForm from "../components/FoodForm";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchFoods } from "../store/foodSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { foods, loading, error } = useAppSelector((state) => state.food);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSearching(true);
      const term = searchTerm.trim();
      await dispatch(fetchFoods(term || undefined)).unwrap();
      setVisibleCount(8);
    } catch (err) {
      console.error("Search failed:", err);
      // Error is already displayed via Redux state
    } finally {
      setSearching(false);
    }
  }

  const visibleFoods = foods.slice(0, visibleCount);
  const hasMore = visibleCount < foods.length;

  return (
    <div className="food-animate-entry">
      {/* Hero Section */}
      <section className="bg-amber-500 w-full py-16 md:py-24 relative overflow-hidden">
        <div className="food-container flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 text-white space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Are you starving?
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="bg-white rounded-xl p-4 shadow-xl max-w-lg mt-8 text-gray-800">
              <div className="flex gap-4 mb-4 border-b border-gray-100 pb-2">
                <button className="flex items-center gap-2 text-amber-500 font-bold bg-red-50 px-4 py-1 rounded-md">
                  <span>🛵</span> Delivery
                </button>
                <button className="flex items-center gap-2 text-gray-500 font-medium px-4 py-1">
                  <span>🛍️</span> Pickup
                </button>
              </div>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 flex items-center gap-2 border border-gray-100">
                  <span className="text-gray-400">🔍</span>
                  <input
                    className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                    placeholder="What do you like to eat today?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition flex items-center gap-2"
                  disabled={loading || searching}
                >
                  {searching ? (
                    <span className="food-spinner border-white" />
                  ) : (
                    "Find Meal"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Delicious Noodles"
              className="w-full max-w-md mx-auto rounded-full shadow-2xl border-4 border-white/20 object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="food-container py-16" id="foods">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Featured Meals</h2>
          <button
            className="food-btn"
            onClick={() => setOpenAdd(true)}
            data-test-id="food-add-btn"
          >
            Add Meal
          </button>
        </div>

        {loading && (
          <div className="food-loading justify-center py-12">
            <span
              className="food-spinner w-8 h-8 text-amber-500"
              aria-hidden="true"
            />
            <span className="text-xl">Loading meals...</span>
          </div>
        )}

        {error && <div className="text-red-500 text-center py-8">{error}</div>}

        {!loading && foods.length === 0 && (
          <div className="empty-state-message">
            No items available. Try adding some!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleFoods.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>

        {hasMore && !loading && (
          <div className="flex justify-center mt-12">
            <button
              className="bg-amber-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-amber-600 transition flex items-center gap-2"
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
              Load more <span className="text-xl">›</span>
            </button>
          </div>
        )}
      </section>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <FoodForm
          onSuccess={() => {
            setOpenAdd(false);
            dispatch(fetchFoods());
          }}
          onCancel={() => setOpenAdd(false)}
        />
      </Modal>
    </div>
  );
}
