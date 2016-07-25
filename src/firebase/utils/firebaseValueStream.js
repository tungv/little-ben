import { getObservableFromValue } from './basicStreams';
import { map } from 'rxjs/operator/map';

export const valueStream = app => (path: string) =>
  getObservableFromValue(app)(path)::map(({ data }) => data.val());
