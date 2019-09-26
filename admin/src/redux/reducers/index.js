
import {combineReducers} from 'redux';
import users from './users';
import articles from './articles';
import common from './common';
//  combineReducers 用来把多个 reducer 创建成一个根 reducer，即合并所有reducer
const rootReducer = combineReducers({
  users,
  common,
  articles
});

export default rootReducer;
