/*
 *      Responsible for handling state and combining 
 *      TimerManager, TimerControl and TimerDisplay components
 */

import React, { useEffect } from "react";
import { useState } from "react";

import TaskManager from "./TaskManager.tsx"
import TimerControl from "./TimerControl.tsx";

// Types
export type Task = {
    name: string,
    duration: number
}

// Utils
function printState(taskList, currentTask, timeLeft, timerOn) {
    console.log("taskList:\t\t", taskList);
    console.log("currentTask:\t", currentTask, "(", taskList[currentTask], ")");
    console.log("timeLeft:\t\t", timeLeft);
    console.log("timerOn:\t\t", timerOn);
    console.log("----")
}

function Timer() {
    // State
    const [taskList, setTaskList] = useState<Task[]>([
        {name: "", duration: 0}
    ]);
    const [currentTask, setCurrentTask] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const [lastTick, setLastTick] = useState<number>(Date.now() / 1000);

    // Timer tick loop
    useEffect(() => {
        printState(taskList, currentTask, timeLeft, timerOn);
        if (!timerOn || timeLeft === 0) {return}

        const currentTick = Date.now() / 1000;
        console.log("current tick", currentTick-lastTick);
        console.log("time left", timeLeft)
        const interval = setInterval(() => setTimeLeft(timeLeft-(currentTick-lastTick)), 10); 
        setLastTick(currentTick); 
        
        return () => clearInterval(interval);
    }, [timeLeft, timerOn]);

    return <>
        <TimerControl
            taskList={taskList} 
            currentTask={currentTask} setCurrentTask={setCurrentTask}
            timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            timerOn={timerOn} setTimerOn={setTimerOn}
            setLastTick={setLastTick}
        />

        <hr /> 

        <TaskManager 
            taskList={taskList} setTaskList={setTaskList} 
            currentTask={currentTask} setCurrentTask={setCurrentTask}
            setTimeLeft={setTimeLeft}
        />
    </>
}

export default Timer;