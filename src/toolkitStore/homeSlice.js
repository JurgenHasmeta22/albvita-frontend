import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    wishlistItems: [],
    basketItems: [],
    product: null,
    user: null,
    productsCount: 0,
    categories: []
};

const HomePageStore = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        invalidateProducts(state) {
            state.products = [];
        },
        setWishlistItems(state, action) {
            state.wishlistItems = action.payload;
        },
        invalidateWishlistItems(state) {
            state.wishlistItems = [];
        },
        setBasketItems(state, action) {
            state.basketItems = action.payload;
        },
        invalidateBasketItems(state) {
            state.basketItems = [];
        },
        setProductItem(state, action) {
            state.product = action.payload;
        },
        invalidateProductItem(state) {
            state.product = null;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        invalidateUser(state) {
            state.user = null;
        },
        setProductsCount(state, action) {
            state.productsCount = action.payload;
        },
        setCategories(state, action) {
            state.categories = action.payload;
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
    setProductsCount,
    setCategories
} = HomePageStore.actions;
