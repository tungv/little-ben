import { getCurrentUserObservable } from '../utils/basicStreams';
import * as ACTION_CREATORS from './actionCreators';

export const subscribeToFirebase = app => dispatch => {
  getCurrentUserObservable(app).subscribe(
    user => dispatch(ACTION_CREATORS.updateUser({ user }))
  );
};
