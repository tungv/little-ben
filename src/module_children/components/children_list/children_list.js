// @flow
/* eslint-disable flowtype/require-return-type */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { partial } from 'lodash';
import { onlyUpdateForKeys } from 'recompose';
import { FirebaseProviderValue } from '../../../firebase/utils/FirebaseProvider';

// type ChildType = {
//   name: string,
//   id: string,
//   parent: string,
// };

type ChildrenListPropsType = {
  childIdArray: string[],
  goToChildPage: Function,
};

const bindChild = FirebaseProviderValue(
  'child',
  ({ childId }) => (childId ? `/children/${childId}` : false),
);

const getCapitalFirst = (string = ' ') => string[0].toUpperCase();

const ChildItem = bindChild(({ child, goToChildPage }) => (
  <ListItem
    primaryText={child.name}
    leftAvatar={<Avatar>{getCapitalFirst(child.name)}</Avatar>}
    onTouchTap={partial(goToChildPage, child.id)}
  />
));

const ChildrenList = (props: ChildrenListPropsType) => (
  <List>
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
