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
    const [taskList, setTaskList] = useState<Task[]>([
        {name: "", duration: 0}
    ]);
    const [currentTask, setCurrentTask] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [timerOn, setTimerOn] = useState<boolean>(false);

    useEffect(() => {
        printState(taskList, currentTask, timeLeft, timerOn);
        if (!timerOn || timeLeft === 0) {return}

        const interval = setInterval(() => setTimeLeft(timeLeft-1), 1000);
        return () => clearInterval(interval);
    }, [timeLeft, timerOn]);

    return <>
        <TimerControl
            taskList={taskList} setTaskList={setTaskList} 
            currentTask={currentTask} setCurrentTask={setCurrentTask}
            timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            timerOn={timerOn} setTimerOn={setTimerOn}
        />

        <hr /> 

        <TaskManager 
            taskList={taskList} setTaskList={setTaskList} 
            currentTask={currentTask} setCurrentTask={setCurrentTask}
            timeLeft={timeLeft} setTimeLeft={setTimeLeft}
        />
    </>
}

export default Timer;