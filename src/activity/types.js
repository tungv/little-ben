export type Bottle = {
  id: string,
  volume: number,
  natural: ?boolean,
  remaining: number,
  done: boolean,
  startTime: number,
  endTime: ?number,
  hidden: boolean,
};

export type Session = {
  id: string,
  activityId: string,
  volume: ?number,
  startTime: number,
  endTime: ?number,
};
