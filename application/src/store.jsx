// Redux Dependancies
import { applyMiddleware } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './5-redux-reducers';

//Redux Dev Tools Dependancies
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';



const store = configureStore(
	rootReducer, 
	composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;