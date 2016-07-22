// @flow
import { handleActions } from 'redux-actions';
import * as ACTIONS from './actions';
import { select } from '../../utils/reducers/helpers';

type UserType = {
  displayName: string,
};

const anonymousUser: UserType = {
  displayName: 'Ba mẹ bé',
};

const currentUser = handleActions({
  [ACTIONS.USER_UPDATED]: select('user');
}, anonymousUser);
