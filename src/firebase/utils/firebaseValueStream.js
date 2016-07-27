import { getObservableFromValue, RefOverloadingType } from './basicStreams';
import { map } from 'rxjs/operator/map';
import { startWith } from 'rxjs/operator/startWith';

export const valueStream = app => (path: RefOverloadingType) =>
  getObservableFromValue(app)(path)::map(({ data }) => data.val())::startWith({});
