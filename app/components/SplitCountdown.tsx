"use client";

import { intervalToDuration, formatDuration, differenceInDays } from "date-fns";
import { useEffect, useState } from "react";

const END_OF_SPLIT_DATE = new Date(2024, 0, 0);

const getFormattedTimeLeft = () => {
  const duration = intervalToDuration({
    start: new Date(),
    end: END_OF_SPLIT_DATE,
  });

  const diffInDays = differenceInDays(END_OF_SPLIT_DATE, new Date());

  duration.years = 0;
  duration.days = diffInDays;

  return formatDuration(duration, {
    format: ["days", "hours", "minutes", "seconds"],
    zero: true
  });
};

export default function SplitCountdown() {
  const [timeLeft, setTimeLeft] = useState(getFormattedTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getFormattedTimeLeft());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return timeLeft;
}
