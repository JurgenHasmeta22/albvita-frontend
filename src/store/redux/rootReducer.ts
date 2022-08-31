import { combineReducers } from '@reduxjs/toolkit';
import homeStore from '../stores/home/home.store';

const rootReducer = combineReducers({
    home: homeStore.reducer,
});

export default rootReducer;
