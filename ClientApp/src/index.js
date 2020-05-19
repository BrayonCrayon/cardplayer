import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from "./store/configureStore";
import {Provider} from "react-redux";
//import registerServiceWorker from './registerServiceWorker';
import Axios from "axios";
import {setToken, setUser} from "./actions/authActions";
import {history} from "./helpers/History";
import {showInfoMsg} from "./helpers/DialogPopup";
import {ApplicationPaths} from "./components/api-authorization/ApiAuthorizationConstants";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

store.dispatch(setToken());
store.dispatch(setUser());

Axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${store.getState().authReducer.token}`;
    return config;
}, (error) => {
    console.log(error);
    if (error.response.status === 401) {
        console.log("Rerouting to login");
        showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
        window.location.pathname = ApplicationPaths.Login;
    }
    return Promise.reject(error);
});

Axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    if (error.response.status === 401) {
        console.log("Rerouting to login");
        showInfoMsg("You've been away a while, don't worry we are auto signing you in :)", 5000);
        window.location.pathname = ApplicationPaths.Login;
    }
    return Promise.reject(error);
});


ReactDOM.render(
  <BrowserRouter  basename={baseUrl} history={history} >
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

