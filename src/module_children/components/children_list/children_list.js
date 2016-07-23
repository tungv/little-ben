// @flow
/* eslint-disable flowtype/require-return-type */
import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { partial } from 'lodash';

type ChildType = {
  name: string,
  id: string,
  parent: string,
};

type ChildrenListPropsType = {
  childArray: ChildType[],
  goToChildPage: Function,
};

const ChildrenList = (props: ChildrenListPropsType) => (
  <List>
    {
      props.childArray.map((child: ChildType) =>
        <ListItem
          key={child.id}
          primaryText={child.name}
          leftAvatar={<Avatar>{child.name[0].toUpperCase()}</Avatar>}
          onTouchTap={partial(props.goToChildPage, child.id)}
        />
      )
    }
  </List>
);

export default ChildrenList;
