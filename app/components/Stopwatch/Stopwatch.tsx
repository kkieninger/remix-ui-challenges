import { useState, useEffect } from "react";
import { PlayIcon, PauseIcon, RefreshIcon } from "@heroicons/react/solid";
import formatTime from "./utils/formatTime";

const THIRTY_MINUTES = 1800;

const buttonProps = {
  width: "2rem",
  height: "2rem",
};

const Stopwatch = ({ expiration = THIRTY_MINUTES }) => {
  const [time, setTime] = useState(895);
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
    <div className="flex justify-center flex-col items-center">
      <div className="mb-3">
        <span className="relative inline-flex">
          <span
            className={`${time >= expiration ? "text-white bg-red-700 ring-red-200/40" : "text-sky-500 bg-slate-800 ring-slate-200/20"} inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md transition ease-in-out duration-150 ring-1`}
          >
            {formatTime(time)}
          </span>
          {time >= expiration && running && (
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleStart}
          className="text-sky-400 hover:text-sky-200 transition ease-in"
        >
          {running ? <PauseIcon {...buttonProps} /> : <PlayIcon {...buttonProps} />}
        </button>
        <button
          onClick={handleReset}
          className="text-sky-400 hover:text-sky-200 transition ease-in mx-1"
        >
          <RefreshIcon {...buttonProps} />
        </button>
        <span className="rounded-full text-slate-900 bg-sky-400 inline-flex justify-center items-center w-[1.875rem] h-[1.875rem] text-xs font-semibold">{`${expiration / 60}m`}</span>
      </div>
    </div>
  );
};

export default Stopwatch;
