import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import {Provider} from "react-redux";
// import { applyMiddleware, createStore } from 'redux';
// import promiseMiddleware from "redux-promise";
// import ReduxThunk from "redux-thunk"; 
// import Reducer from "./_reducers";

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) 

ReactDOM.render(
  <React.StrictMode>
      <App />
    {/* <Provider store={createStoreWithMiddleware(Reducer)}>
    </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
