// @flow
import React from 'react';
import { compose, defaultProps, mapProps } from 'recompose';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

type ChildType = {
  id: string,
  parent: string,
  name: string,
};

type ChildrenListPropsType = {
  childArray: ChildType[],
};

const ChildrenListItem = compose(
  mapProps((child: ChildType) => ({
    key: child.id,
    primaryText: child.name,
    leftAvatar: <Avatar>{child.name[0].toUpperCase()}</Avatar>,
  }))
)(ListItem);

const ChildrenList = compose(
  defaultProps({
    childArray: [],
  }),
  mapProps(
    ({ childArray }: ChildrenListPropsType) => ({
      children: childArray.map(ChildrenListItem),
    })),
)(List);

export default ChildrenList;
