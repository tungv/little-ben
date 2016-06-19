type UnitActivity = {
  activityType: string,
  createdAt: Date,
  unit: string,
  amount: number
};

type TimeOnlyActivity = {
  activityType: string,
  createdAt: Date,
}

export type Activity = UnitActivity | TimeOnlyActivity;
