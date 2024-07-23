import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeItemFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        cartSlice.caseReducers.removeItemFromCart(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

/* reselect example - improves performance
const getCartItems = (state) => state.cart.cart 
export const getCart = createSelector ( [getCartItems], (cart) => cart );
*/

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// export function getCurrentQuantityById(id) { return function (state) { return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0; }; }
