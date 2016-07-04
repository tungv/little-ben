export type Bottle = {
  id: string,
  volume: number,
};

export type Session = {
  id: string,
  activityId: string,
  volume: ?number,
  startTime: ?number,
  endTime: ?number,
};
