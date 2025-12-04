import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../types/food";
import * as api from "../app/api/food";

interface FoodState {
  foods: Food[];
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  foods: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchFoods = createAsyncThunk(
  "food/fetchFoods",
  async (searchTerm?: string) => {
    const data = await api.fetchFoods(searchTerm);
    return data;
  }
);

export const createFood = createAsyncThunk(
  "food/createFood",
  async (payload: Partial<Food>) => {
    const data = await api.createFood(payload);
    return data;
  }
);

export const updateFood = createAsyncThunk(
  "food/updateFood",
  async ({ id, payload }: { id: string; payload: Partial<Food> }) => {
    const data = await api.updateFood(id, payload);
    return data;
  }
);

export const deleteFood = createAsyncThunk(
  "food/deleteFood",
  async (id: string) => {
    await api.deleteFood(id);
    return id;
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch foods
    builder.addCase(fetchFoods.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchFoods.fulfilled,
      (state, action: PayloadAction<Food[]>) => {
        state.loading = false;
        state.foods = action.payload;
      }
    );
    builder.addCase(fetchFoods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load foods";
    });

    // Create food
    builder.addCase(
      createFood.fulfilled,
      (state, action: PayloadAction<Food>) => {
        state.foods.push(action.payload);
      }
    );

    // Update food
    builder.addCase(
      updateFood.fulfilled,
      (state, action: PayloadAction<Food>) => {
        const index = state.foods.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.foods[index] = action.payload;
        }
      }
    );

    // Delete food
    builder.addCase(
      deleteFood.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.foods = state.foods.filter((f) => f.id !== action.payload);
      }
    );
  },
});

export default foodSlice.reducer;
