import { getObservableFromValue, PathOverloadingType } from './basicStreams';
import { map } from 'rxjs/operator/map';

export const valueStream = app => (path: PathOverloadingType) =>
  getObservableFromValue(app)(path)::map(({ data }) => data.val());
