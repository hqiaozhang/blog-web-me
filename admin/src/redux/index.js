// // // import {createStore, applyMiddleware, compose} from 'redux';
// // // import reduxOrder from 'redux-order';
// // // import reducers from './reducers';
// // // import DevTools from './DevTools';

// // // const enhancer = compose(
// // //   applyMiddleware(reduxOrder()),
// // //   DevTools.instrument()
// // // );

// // // const store = createStore(
// // //   reducers,
// // //   enhancer
// // // );

// // // export default store;


// import * as actions from './action';
// import store from './store';


// const Content = {
//   actions,
//   store
// };


// export default Content;


// // import {createStore, combineReducers, applyMiddleware} from 'redux';
// // import thunk from 'redux-thunk';
// // import * as reducers from './reducers';

// // const reducer = combineReducers(reducers);
// // // applyMiddleware 为 createStore 注入了 middleware:
// // const store = createStore(reducer, applyMiddleware(thunk));

// // export default store;
