import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Function to fetch data from localStorage
function fetchFromLocalStorage() {
  let value = localStorage.getItem("value");
  if (value) {
    return JSON.parse(value);
  } else {
    return []; // Returns an empty array if no data found
  }
}

// Function to store data in localStorage
function storeInLocalStorage(data) {
  localStorage.setItem("value", JSON.stringify(data));
}

// Initial state for the navbar slice
const initialState = {
  value: fetchFromLocalStorage(), // Retrieves data from localStorage
};

// Creating a slice for the navbar
export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    // Reducer for adding a product to the navbar
    add: (state, action) => {
      const existingProduct = state.value.find(
        (eachProduct) => eachProduct.id === action.payload.id
      );

      if (existingProduct) {
      } else {
        // If product doesn't exist, add it with a quantity of 1
        state.value = [...state.value, { ...action.payload, quantity: 1 }];
      }

      // Filter out unique products based on their IDs
      const uniqueProducts = state.value.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );

      state.value = uniqueProducts;
      storeInLocalStorage(state.value); // Store updated data in localStorage
      toast.success("Product is added!");
    },

    // Reducer for removing a product from the navbar
    remove: (state, action) => {
      const index = state.value.findIndex(
        (product) => product.id === action.payload
      );

      if (index !== -1) {
        state.value.splice(index, 1); // Remove product from the array by index
        storeInLocalStorage(state.value); // Store updated data in localStorage
        toast.success("Product is removed!");
      }
    },

    // Reducer for removing one quantity of a product from the navbar
    removeOne: (state, action) => {
      const index = state.value.findIndex(
        (product) => product.id === action.payload
      );

      if (index !== -1) {
        if (state.value[index].quantity > 1) {
          state.value[index].quantity -= 1; // Decrement quantity if greater than 1
          storeInLocalStorage(state.value); // Store updated data in localStorage
          toast.success("Product is removed!");
        }
      }
    },
  },
});

// Exporting action creators
export const { add, remove, removeOne } = navbarSlice.actions;

// Exporting the reducer function
export default navbarSlice.reducer;
