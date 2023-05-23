import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Update property name to "coupons"
};

export const couponBookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addCoupon: (state, action) => {
      //Will change based on price, or membership etc.
      if (state.items.length < 8) {
        state.items = [...state.items, action.payload];
      }
    },
    removeCoupon: (state, action) => {
      const couponIndex = action?.payload;
      state.items.splice(couponIndex, 1);
    },
    clearCouponBook: state => {
      state.items = [];
    },
  },
});

export const { addCoupon, removeCoupon, clearCouponBook } = couponBookSlice.actions;

export const selectCouponBookItems = (state) => state.book.items; // Access "coupons" property

export default couponBookSlice.reducer;