import StopwatchControls from "./StopwatchControls";

export default function StopWatch({ time, name }: { time: number, name: string }) {
    const {
        minutes,
        seconds,
        reset,
        skip,
        startAndStop,
        isRunning
    } = StopwatchControls({ time });
    return <div className="flex flex-col items-center rounded-lg w-full p-3 2xl:p-7 bg-tomato-400 gap-3">
        <h1 className="text-5xl font-bold first-letter:uppercase min-[1920px]:text-6xl">{name}</h1>
        <span className="text-8xl font-bold text-gray-200 min-[1920px]:text-9xl">{minutes}:{seconds}</span>

        <div className="flex justify-between w-full items-center px-2 mt-3">

            <button onClick={reset}>
                <img src="/reset.svg" className="size-6 hover:scale-105 active:scale-95 hover:rotate-[200deg] duration-300" alt="reset" />
            </button>

            <button onClick={startAndStop} className="text-3xl bg-white w-48 py-1 rounded-md text-tomato-400 font-semibold hover:scale-105 active:scale-95 duration-150">
                {isRunning ? "stop" : "start"}
            </button>

            <button onClick={skip}>
                <img src="/next.svg" className="size-6 hover:scale-105 active:scale-95 duration-150" alt="next" />
            </button>
        </div>
    </div>
}

