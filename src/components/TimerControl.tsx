/*
 *      Responsible for keeping track of current time, resetting,
 *      starting/stopping, or skipping the timer.
 */

import React, { useRef } from "react";
import type { Task } from "./Timer";

// Utils
async function playSound() {   // ADDME: option to upload own audio
    const audio = new Audio(require("../assets/alarm.mp3"));

    const audioPromise = audio.play(); // FIXME: audio duplicates if tasks are of small duration
    if (audioPromise !== undefined) {
        audioPromise
            .then(() => {
                console.log("Audio");
            })
            .catch((err) => {
                // catch dom exception
                console.info(err);
            });
    }
} 



// Timer control

function toggleTimer(timerOn: boolean, setTimerOn: any) {
    setTimerOn(!timerOn);
}

function resetTask(taskList: Task[], currentTask: number, setTimeLeft: any) {
    setTimeLeft(taskList[currentTask].duration);
}

function offsetCurrentTask(taskList: Task[], currentTask: number, setCurrentTask: any, setTimeLeft: any, timerOn: boolean, diff: number) {
    // Avoiding never ending loops
    if (taskList.length === 0) {return}                                     // Avoids never ending loop when taskList's length is 0
    if (taskList.every((task) => {return task.duration === 0})) {return}    // Avoids never ending "nextTask" calls when all durations are 0

    // Calculating next task index in taskList
    // If the next task's position is -1 then it wraps around the taskList, to the last task
    // Otherwise it limits the value by the length of the task list (% taskList.length) to avoid index errors
    const nextTask = (currentTask + diff) === -1 ? taskList.length-1 : (currentTask + diff) % taskList.length;

    // Setting currentTask
    setCurrentTask(nextTask);
    setTimeLeft(taskList[nextTask].duration);

    // Displaying notification
    if (timerOn) {
        playSound();
    }
}



// Component 

function TimerControl(
    { taskList, currentTask, setCurrentTask, timeLeft, setTimeLeft, timerOn, setTimerOn }:
    { taskList: Task[], currentTask: number, setCurrentTask: any, timeLeft: number, setTimeLeft: any, timerOn: boolean, setTimerOn: any }
) {
    // Calling offCurrentTask (next task) if duration has elapsed
    if (timeLeft <= 0) {
        offsetCurrentTask(taskList, currentTask, setCurrentTask, setTimeLeft, timerOn, 1);
    }

    // Computing state
    const name: string | number = (() => {
        if (taskList.length === 0) {
            return "NONE"
        } else {
            return taskList[currentTask].name;
        }
    })();

    const h = Math.floor(timeLeft / 3600).toString();
    const m = Math.floor(timeLeft % 3600 / 60).toString();
    const s = Math.floor(timeLeft % 3600 % 60).toString();

    const dh = h.length === 1 ? `0${h}` : h;
    const dm = m.length === 1 ? `0${m}` : m;
    const ds = s.length === 1 ? `0${s}` : s;

    return <div className="timer">
        <h1 className={timerOn ? "timer-active" : "timer-inactive"}>{dh}:{dm}:{ds}</h1>
        <h3 className={"wrap"}>-- {name} --</h3>
        <button onClick={() => toggleTimer(timerOn, setTimerOn)}>Start/Stop</button> <br />
        <button onClick={() => resetTask(taskList, currentTask, setTimeLeft)}>Reset Task</button> <br />
        <div className="next-prev-container">
            <button onClick={() => offsetCurrentTask(taskList, currentTask, setCurrentTask, setTimeLeft, timerOn, -1)}>Previous Task</button>
            <button onClick={() => offsetCurrentTask(taskList, currentTask, setCurrentTask, setTimeLeft, timerOn, 1)}>Next Task</button> <br />
        </div>

        <audio src="../assets/alarm.mp3"></audio>
    </div>
}

export default TimerControl;
