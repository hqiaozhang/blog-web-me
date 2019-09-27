
import {combineReducers} from 'redux';
import users from './users';
import common from './common';
import articles from './articles';
import project from './project';
//  combineReducers 用来把多个 reducer 创建成一个根 reducer，即合并所有reducer
const rootReducer = combineReducers({
  common,
  users,
  articles,
  project
});

export default rootReducer;
