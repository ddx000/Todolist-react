import React from "react";
import { useState, useEffect } from "react";

const Timer = ({
  initialMinute,
  initialSeconds,
  isActive,
  cnt,
  setCnt,
  setIsActive,
  focusMode,
  setFocusMode,
}) => {
  //const { initialMinute = 25, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    console.log("use effect", minutes, seconds);
    let myInterval = setInterval(() => {
      if (isActive) {
        console.log("###");
        setSeconds(seconds - 1);
        if (seconds === 0) {
          if (minutes === 0) {
            console.log("clear");
            clearInterval(myInterval);
            setMinutes(initialMinute);
            setSeconds(initialSeconds);
            setIsActive(false);
            setFocusMode(false);
            setCnt(cnt + 1);
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
