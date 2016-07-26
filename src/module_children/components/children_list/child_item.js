import React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { isEmpty, partial } from 'lodash';
import { connectToValue } from '../../../firebase/utils/FirebaseProvider';
import colorize from '../../../utils/colors/colors';

type ChildType = {
  name: string,
  id: string,
  parent: string,
};

const bindChild = connectToValue(
  'child',
  ({ childId }) => (childId ? `/children/${childId}` : false),
);

const getCapitalFirst = (string = ' ') => string[0].toUpperCase();
const getAvatar = (child: ChildType) => (
  <Avatar backgroundColor={colorize(child.name + child.id)}>{getCapitalFirst(child.name)}</Avatar>
);

const ChildItem = bindChild(({ child, goToChildPage }) => (
  isEmpty(child) ? <ListItem /> : <ListItem
    primaryText={child.name}
    leftAvatar={getAvatar(child)}
    onTouchTap={partial(goToChildPage, child.id)}
  />
));

export default ChildItem;
