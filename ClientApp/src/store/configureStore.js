﻿import {applyMiddleware, createStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducer'
import thunk from "redux-thunk";
import {compose} from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

export default store;