import { combineReducers } from 'redux';
import { handleActions, createAction } from 'redux-actions';
import { connect } from 'react-redux';
import EnhancedLayoutComponent from './raw-layout';
import { get } from 'lodash/fp';
import { select } from '../utils/reducers/helpers';

const LAYOUT_SET_TITLE = 'Layout/setTitle';
const getTitle = get('layout.title');

export const ConnectedLayoutComponent = connect(
  state => ({
    title: getTitle(state),
  }),
)(EnhancedLayoutComponent);

export default ConnectedLayoutComponent;

const titleReducer = handleActions({
  [LAYOUT_SET_TITLE]: select('title'),
}, 'Little Ben');

export const reducer = combineReducers({
  title: titleReducer,
});

export const setTitle = createAction(LAYOUT_SET_TITLE, (title: string) => ({ title }));
