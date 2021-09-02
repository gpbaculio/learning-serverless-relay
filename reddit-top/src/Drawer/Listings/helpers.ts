import { DateTime, DurationObjectUnits, DurationUnit } from "luxon";

export const timeAgo = (date: Date) => {
  const units: Intl.RelativeTimeFormatUnit[] = [
    "year",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
  ];
  let dateTime = DateTime.fromISO(date.toISOString());
  const diff = dateTime.diffNow().shiftTo(...(units as DurationUnit[]));
  const unit =
    units.find((unit) => diff.get(unit as keyof DurationObjectUnits) !== 0) ||
    "second";

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  return relativeFormatter.format(
    Math.trunc(diff.as(unit as keyof DurationObjectUnits)),
    unit
  );
};

export type ListKToUpdate = "isDismissed" | "isRead";
