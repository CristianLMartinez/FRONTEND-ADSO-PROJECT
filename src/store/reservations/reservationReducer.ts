import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getReservationsAction,
  createReservationAction,
  checkedInReservationAction,
} from "./reservationActions";
import { Reservation, ReservationReducer } from "@/types/Reservation";
import { getUncheckedReservationsAction } from "./reservationActions";

const initialState: ReservationReducer = {
  isLoading: false,
  data: [],
  isError: false,
};

const startLoading = (state: ReservationReducer) => {
  state.isLoading = true;
  state.isError = false;
};

const loadingFailed = (state: ReservationReducer) => {
  state.isLoading = false;
  state.isError = true;
};

const reservationSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * Add the getAllMenusAction reducer
      .addCase(getReservationsAction.pending, startLoading)
      .addCase(
        getReservationsAction.fulfilled,
        (state, action: PayloadAction<Reservation[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(getReservationsAction.rejected, loadingFailed)
      // * Add the addMenu reducer
      .addCase(createReservationAction.pending, startLoading)
      .addCase(
        createReservationAction.fulfilled,
        (state, action: PayloadAction<Reservation>) => {
          state.isLoading = false;
          state.data.push(action.payload);
        }
      )
      .addCase(createReservationAction.rejected, loadingFailed)
      .addCase(getUncheckedReservationsAction.pending, startLoading)
      .addCase(getUncheckedReservationsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        );
      })
      .addCase(getUncheckedReservationsAction.rejected, loadingFailed)

      .addCase(checkedInReservationAction.pending, startLoading)
      .addCase(checkedInReservationAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        );
      })
      .addCase(checkedInReservationAction.rejected, loadingFailed);
  },
});

export default reservationSlice.reducer;
