import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Function to fetch data from localStorage
function fetchFromLocalStorage() {
  let value = localStorage.getItem("details");
  if (value) {
    return JSON.parse(value);
  } else {
    return []; // empty array if no data is found
  }
}

// Function to store data in localStorage
function storeInLocalStorage(data) {
  localStorage.setItem("details", JSON.stringify(data));
}

// Initial state for the slice
const initialState = {
  loading: false,
  value: fetchFromLocalStorage(), // Retrieving data from localStorage
  error: "",
};

// Async thunk to fetch details from an API endpoint
export const getDetails = createAsyncThunk("getDetails", async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data; // Returning the retrieved data from the API
});

// Creating a slice for details
export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {}, // No additional reducers defined
  extraReducers: (builder) => {
    // Handling the pending state while fetching data
    builder.addCase(getDetails.pending, (state, action) => {
      state.loading = true;
    });

    // Handling the fulfilled state when data is successfully fetched
    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload; // Updating state with the fetched data
      storeInLocalStorage(state.value); // Storing the fetched data in localStorage
    });

    // Handling the rejected state if there's an error in fetching data
    builder.addCase(getDetails.rejected, (state, action) => {
      state.loading = false; // Setting loading to false
      state.error = "Bad fetching!"; // Setting an error message
    });
  },
});

// Exporting the reducer from the slice
export default detailsSlice.reducer;
