import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./redux/basketSlice";
import bookReducer from "./redux/couponBookSlice"

export const store = configureStore({
    reducer: {
        basket: basketReducer,
        book: bookReducer,
    },

});

