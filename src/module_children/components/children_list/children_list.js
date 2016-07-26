/* eslint-disable flowtype/require-return-type */
import React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import ChildItem from './child_item';
import * as COPY from '../../copy.json';

type ChildrenListPropsType = {
  childIdArray: string[],
  goToChildPage: Function,
};

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
