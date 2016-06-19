import { createAction } from 'redux-actions';

type UnitActivity = {
  activityType: string,
  createdAt: date,
  unit: string,
  amount: number
};

type TimeOnlyActivity = {
  activityType: string,
  createdAt: date,
}

type Activity = UnitActivity | TimeOnlyActivity;

export const intialState = {
  activities: [
    'BREASTFEED',
    'MILK BOTTLED',
    'CHANGE - PEE',
    'CHANGE - WEE',
  ],
  activity_log: [

  ]
}
