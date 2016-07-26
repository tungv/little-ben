import { getObservableFromValue, PathOverloadingType } from './basicStreams';
import { map } from 'rxjs/operator/map';
import { startWith } from 'rxjs/operator/startWith';

export const valueStream = app => (path: PathOverloadingType) =>
  getObservableFromValue(app)(path)::startWith({ event: '@@INIT' })::map(({ data }) => data.val());
