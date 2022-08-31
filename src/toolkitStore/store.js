import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import HomePageStore from './homeSlice';

const combinedReducer = combineReducers({
    home: HomePageStore.reducer,
});

export const makeStore = () =>
    configureStore({
        reducer: combinedReducer,
    });

export const wrapper = createWrapper(makeStore, { debug: true });
