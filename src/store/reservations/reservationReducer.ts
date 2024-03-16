import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuReducer } from "@/types/Menu";
import {
  getReservationsAction,
  createReservationAction,
} from "./reservationActions";
import { Menu } from "@/types/Menu";

const initialState: MenuReducer = {
  isLoading: false,
  data: [],
  isError: false,
};

const reservationSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * Add the getAllMenusAction reducer
      .addCase(getReservationsAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getReservationsAction.fulfilled,
        (state, action: PayloadAction<Menu[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(getReservationsAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // * Add the addMenu reducer
      .addCase(createReservationAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        createReservationAction.fulfilled,
        (state, action: PayloadAction<Menu>) => {
          state.isLoading = false;
          state.data.push(action.payload);
        }
      )
      .addCase(createReservationAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default reservationSlice.reducer;
