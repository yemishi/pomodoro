import { useState, useEffect } from "react";

export default function StopwatchControls({ time: taskTime }: { time: number }) {
    const totalTime = taskTime * 60;
    const times = [totalTime, 300, totalTime, 300, totalTime, 300, totalTime, 900];

    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(times[count]);

    useEffect(() => {
        setTime(times[count]);
    }, [count]);

    useEffect(() => {
        let intervalId: number | undefined;
        if (isRunning && time > 0) {
            intervalId = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
        } else if (time === 0) {
            setCount(count === 7 ? 0 : count + 1);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time, count]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const startAndStop = () => setIsRunning(!isRunning);

    const reset = () => {
        setTime(times[count]);
        setIsRunning(false);
    };

    const skip = () => setCount(count === 7 ? 0 : count + 1);


    return {
        isRunning,
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        startAndStop,
        reset,
        skip
    };
};