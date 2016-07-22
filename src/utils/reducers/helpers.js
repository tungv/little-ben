// @flow
import { get } from 'lodash/fp';

export const select = (path: string) : any => get(`payload.${path}`);
