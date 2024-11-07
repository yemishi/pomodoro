import { useEffect, useRef, useState } from 'react'
import StopWatch from './components/StopWatch';

export default function App() {
  const savedTasks = localStorage.getItem("tasks");
  const parsedTasks = savedTasks ? JSON.parse(savedTasks) as [{ name: string, time: number }] : null;

  const [tasks, setTasks] = useState(parsedTasks ? parsedTasks : [{ name: "task", time: 20 }])
  const [count, setCount] = useState(0);
  const [newTask, setNewTask] = useState({ name: "new task", time: 20 })
  const [isEdit, setIsEdit] = useState<false | number>(false)
  const editRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEdit(false);
      }
    };

    if (typeof isEdit === 'number') {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEdit]);


  const handleNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newTask.name) return
    setTasks([...tasks, newTask])
    setNewTask({ name: "new task", time: 20 })
  }

  const EditTask = ({ index }: { index: number }) => {
    const handleTime = (action: "increment" | "decrement") => {
      setTasks((t) => {
        return t.map((v, i) => {
          if (i === index) return { name: v.name, time: action === "increment" ? v.time + 5 : v.time - 5 > 0 ? v.time - 5 : v.time }
          return v
        })
      })
    }

    const handleDelete = () => {
      if (tasks.length > 1) {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        if (index <= count) setCount(Math.max(count - 1, 0));
        setIsEdit(false);
      }
    };

    return <div ref={editRef} className="flex flex-col absolute right-0 -top-10 border-2 border-gray-600 bg-white rounded-md z-20 lg:text-xl 2xl:text-2xl 2xl:-right-10">
      <button onClick={(e) => { e.stopPropagation(), handleTime("increment") }} className='hover:bg-gray-100 z-20 active:bg-gray-200 p-2 duration-150 border-b-2 rounded-t-md'>increment</button>
      <button onClick={(e) => { e.stopPropagation(), handleTime("decrement") }} className='hover:bg-gray-100 active:bg-gray-200 p-2 duration-150 border-b-2'>decrement</button>
      <button onClick={(e) => { e.stopPropagation(), handleDelete() }} className='hover:bg-gray-100 active:bg-gray-200 p-2 duration-150 rounded-b-md'>delete</button>
    </div>
  }

  return (
    <div className="flex flex-col h-screen w-full p-4 gap-3 pt-10 max-w-[500px] 2xl:max-w-[570px] mx-auto justify-center  ">
      <StopWatch key={tasks.indexOf(tasks[count])} name={tasks[count].name} time={tasks[count].time} />

      <div className='text-black flex flex-col gap-3 mt-9'>
        {tasks.map(({ name, time }, i) => {
          const isCurr = tasks.indexOf(tasks[count]) === i;
          const selectTask = () => { setCount(i); };
          return (
            <div onClick={selectTask} className={`${isCurr ? "bg-gray-300 pointer-events-none" : "bg-white hover:bg-opacity-95 cursor-pointer"} 
            duration-150 p-3 2xl:p-4 rounded-lg font-medium flex justify-between items-center relative`}
              key={`${name}-${i}`}>
              <div className='flex gap-1'>
                <span className='text-lg min-[1920px]:text-xl first-letter:uppercase font-semibold'>{name}</span>
                <span className='text-xs min-[1920px]:text-base self-end text-emerald-600 font-extrabold 2xl:text-sm'>{time}m</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setIsEdit(i); }} className='border-2 rounded-md p-1 hover:backdrop-brightness-90 duration-150 hover:scale-105 active:scale-95'>
                <img src="/options.svg" className='size-5' alt="options" />
              </button>
              {typeof isEdit === "number" && isEdit === i && <EditTask index={i} />}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleNewTask} className='w-full flex gap-4 justify-center mt-2 md:text-lg'>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className='p-1 px-2 rounded-lg text-black font-sans font-medium border border-black outline-none min-[1920px]:text-xl'
        />
        <button className='bg-emerald-500 bg-opacity-65 font-bold size-8 min-[1920px]:size-10 text-2xl rounded-full border border-black hover:bg-opacity-55 duration-150 hover:scale-105
         active:scale-95'>
          +
        </button>
      </form>
    </div>
  );
}




