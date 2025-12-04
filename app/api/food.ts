import axios, { AxiosError } from "axios";
import { Food } from "../../types/food";

// Base URL configuration - can be overridden via environment variable
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://6852821e0594059b23cdd834.mockapi.io";

// Create axios instance with base URL
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Error handling helper
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Server responded with error status
      const status = axiosError.response.status;
      const message =
        (axiosError.response.data as { message?: string })?.message ||
        axiosError.message;
      throw new Error(`API Error ${status}: ${message}`);
    } else if (axiosError.request) {
      // Request made but no response received
      throw new Error("Network Error: No response from server");
    } else {
      // Error setting up request
      throw new Error(`Request Error: ${axiosError.message}`);
    }
  }
  // Unknown error
  throw new Error(
    error instanceof Error ? error.message : "An unknown error occurred"
  );
};

/**
 * Fetch all foods or filter by name
 * @param name - Optional search term to filter foods by name
 * @returns Promise resolving to array of Food items
 */
export async function fetchFoods(name?: string): Promise<Food[]> {
  try {
    const url = name ? `/Food?name=${encodeURIComponent(name)}` : "/Food";
    const res = await API.get<Food[]>(url);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Create a new food item
 * @param payload - Food data to create
 * @returns Promise resolving to created Food item
 */
export async function createFood(payload: Partial<Food>): Promise<Food> {
  try {
    const res = await API.post<Food>("/Food", payload);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update an existing food item
 * @param id - ID of the food item to update
 * @param payload - Food data to update
 * @returns Promise resolving to updated Food item
 */
export async function updateFood(
  id: string,
  payload: Partial<Food>
): Promise<Food> {
  try {
    const res = await API.put<Food>(`/Food/${id}`, payload);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Delete a food item
 * @param id - ID of the food item to delete
 * @returns Promise that resolves when deletion is complete
 */
export async function deleteFood(id: string): Promise<void> {
  try {
    await API.delete(`/Food/${id}`);
  } catch (error) {
    handleApiError(error);
  }
}

// Export the API instance and base URL for potential use elsewhere
export { API, BASE_URL };
