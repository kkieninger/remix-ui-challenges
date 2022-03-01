import { useState, useEffect } from "react";
import formatTime from "./utils/formatTime";

const THIRTY_MINUTES = 1800;

const Stopwatch = ({ expiration = THIRTY_MINUTES }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> = setInterval(() => {}, 0);

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  const handleStart = () => {
    setRunning(!running);
  };

  return (
    <div>
      <div
        className={`numbers ${
          time >= expiration ? (running ? "pulse" : "red") : ""
        }`}
      >
        {formatTime(time)}
      </div>
      <div>
        <button onClick={handleStart}>{running ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
