import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import user from './user';

export const reducers = combineReducers({
  user
});

export default createStore(reducers, applyMiddleware(thunk));
