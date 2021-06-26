import React from "react";
import { useState, useEffect } from "react";

const playSound = () => {
  const audio = new Audio(process.env.PUBLIC_URL + "/done_sound.mp3");
  audio.play();
};

const Timer = ({
  initialMinute,
  initialSeconds,
  todoActive,
  TimeUpHandler,
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (todoActive) {
        console.log("###");
        setSeconds(seconds - 1);
        if (seconds === 0) {
          if (minutes === 0) {
            console.log("clear");
            clearInterval(myInterval);
            setMinutes(initialMinute);
            setSeconds(initialSeconds);
            TimeUpHandler();
            playSound();
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
  return (
    <div>
      <h1>
        {" "}
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};

export default Timer;
