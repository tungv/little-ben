export type Bottle = {
  id: string,
  volume: number,
  remaining: number,
  done: boolean,
};

export type Session = {
  id: string,
  activityId: string,
  volume: ?number,
  startTime: ?number,
  endTime: ?number,
};
