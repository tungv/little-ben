/* eslint-disable flowtype/require-return-type */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { partial } from 'lodash';
import { onlyUpdateForKeys } from 'recompose';
import { connectToValue } from '../../../firebase/utils/FirebaseProvider';

import * as COPY from '../../copy.json';
import colorize from '../../../utils/colors/colors';

type ChildType = {
  name: string,
  id: string,
  parent: string,
};

type ChildrenListPropsType = {
  childIdArray: string[],
  goToChildPage: Function,
};

const bindChild = connectToValue(
  'child',
  ({ childId }) => (childId ? `/children/${childId}` : false),
);

const getCapitalFirst = (string = ' ') => string[0].toUpperCase();
const getAvatar = (child: ChildType) => (
  <Avatar backgroundColor={colorize(child.name)}>{getCapitalFirst(child.name)}</Avatar>
);

const ChildItem = bindChild(({ child, goToChildPage }) => (
  <ListItem
    primaryText={child.name}
    leftAvatar={getAvatar(child)}
    onTouchTap={partial(goToChildPage, child.id)}
  />
));

const ChildrenList = (props: ChildrenListPropsType) => (
  <List>
    <Subheader>{COPY.CHILDREN_LIST_TITLE}</Subheader>
    {
      props.childIdArray.map((childId: string) => (
        <ChildItem
          childId={childId}
          key={childId}
          goToChildPage={props.goToChildPage}
        />
      ))
    }
  </List>
);

export default onlyUpdateForKeys(
  ['childIdArray']
)(ChildrenList);
