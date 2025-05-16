"use client"

import React, { useState, useEffect } from "react";

const Timer = () => {
  const targetDate = new Date("2025-06-01T00:00:00"); // Set your desired target date
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const total = targetDate.getTime() - new Date().getTime();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Min" />
      <CountdownItem value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

const CountdownItem = ({ value, label }) => (
  <div className="flex flex-col p-2 bg-neutral-600 rounded-box text-white  rounded-md">
    <span className="countdown font-mono text-xl">
      <span
        style={{ "--value": value }}
        aria-live="polite"
        aria-label={`${value} ${label}`}
      >
        {value}
      </span>
    </span>
    {label}
  </div>
);

export default Timer;
