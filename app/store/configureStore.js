import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

// Reference
// https://github.com/facebook/react-native/issues/3049
// https://github.com/aksonov/react-native-router-flux/issues/199#issuecomment-190474938

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
