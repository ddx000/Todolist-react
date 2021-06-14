import React from "react";
import { useState, useEffect } from "react";

const Timer = ({
  initialMinute,
  initialSeconds,
  isActive,
  countHandler,
  setIsActive,
  focusMode,
  setFocusMode,
  statusHandler,
}) => {
  //const { initialMinute = 25, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (isActive) {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          if (minutes === 0) {
            // time is up
            clearInterval(myInterval);
            // reset
            setMinutes(initialMinute);
            setSeconds(initialSeconds);
            // not active and cnt+1
            setIsActive(false);
            setFocusMode(false);
            countHandler();
            statusHandler(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  if (focusMode) {
    return (
      <div>
        <h1>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>
    );
  } else {
    return null;
  }
};

export default Timer;
