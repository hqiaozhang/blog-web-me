
import * as usersApi from './users';
import * as articlesApi from './articles';
import * as projectApi from './project';

export default {
  ...usersApi,
  ...articlesApi,
  ...projectApi
};

