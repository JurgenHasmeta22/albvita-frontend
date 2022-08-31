import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
    products: [],
    wishlistItems: [],
    basketItems: [],
    product: null,
    user: null,
};

const HomePageStore = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<any>) {
            state.products = action.payload;
        },
        invalidateProducts(state) {
            state.products = [];
        },
        setWishlistItems(state, action: PayloadAction<any>) {
            state.wishlistItems = action.payload;
        },
        invalidateWishlistItems(state) {
            state.wishlistItems = [];
        },
        setBasketItems(state, action: PayloadAction<any>) {
            state.wishlistItems = action.payload;
        },
        invalidateBasketItems(state) {
            state.basketItems = [];
        },
        setProductItem(state, action: PayloadAction<any>) {
            state.product = action.payload;
        },
        invalidateProductItem(state) {
            state.product = null;
        },
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        invalidateUser(state) {
            state.user = null;
        },
    },
});

export default HomePageStore;

export const {
    setProducts,
    invalidateProducts,
    setBasketItems,
    invalidateBasketItems,
    setWishlistItems,
    invalidateWishlistItems,
    setUser,
    invalidateUser,
    setProductItem,
    invalidateProductItem,
} = HomePageStore.actions;
