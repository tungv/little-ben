// @flow
import { handleActions } from 'redux-actions';
import type { FirebaseUserType } from '../../firebase';
import { actions as USER_ACTIONS } from '../package.json';

const initialUser = {
  displayName: 'loading...',
};

export default handleActions({
  [USER_ACTIONS.LOGGED_IN]: (
    state: FirebaseUserType,
    { payload }: { payload: FirebaseUserType}
  ) : FirebaseUserType => payload || initialUser,
}, initialUser);
