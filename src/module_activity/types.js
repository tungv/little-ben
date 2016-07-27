export type ActivityType = {
  id: string,
  volume: number,
  natural: ?boolean,
  remaining: ?number,
  done: boolean,
  startTime: number,
  endTime: ?number,
  hidden: boolean,
};

export type DailyType = {
  date: string,
  dayData: {
    volume: number,
    count: number,
  },
};
