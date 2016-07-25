// @flow
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as ACTIONS from './actions';
import { select } from '../../utils/reducers/helpers';
import type { FirebaseUserType } from '../types';

const anonymousUser: FirebaseUserType = {
  displayName: 'Ba mẹ bé',
};

const currentUser = handleActions({
  [ACTIONS.USER_UPDATED]: select('user', anonymousUser),
}, anonymousUser);

export default combineReducers({
  currentUser,
});
