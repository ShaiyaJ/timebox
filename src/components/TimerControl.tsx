/*
 *      Responsible for keeping track of current time, resetting,
 *      starting/stopping, or skipping the timer.
 */

import React, { useState } from "react";
import type { Task } from "./Timer";

function toggleTimer(timerOn, setTimerOn) {
    setTimerOn(!timerOn);
}

function resetTask(taskList, currentTask, setTimeLeft) {
    setTimeLeft(taskList[currentTask].duration);
}

function nextTask(taskList: Task[], currentTask, setCurrentTask, setTimeLeft) {
    // Avoiding never ending loops
    if (taskList.length === 0) {return}                                     // Avoids never ending loop when taskList's length is 0
    if (taskList.every((task) => {return task.duration === 0})) {return}    // Avoids never ending "nextTask" calls when all durations are 0

    // Setting currentTask
    const nextTask = (currentTask+1) % taskList.length;
    setCurrentTask(nextTask);
    setTimeLeft(taskList[nextTask].duration);
}

function TimerControl(
    { taskList, setTaskList, currentTask, setCurrentTask, timeLeft, setTimeLeft, timerOn, setTimerOn }:
    { taskList: Task[], setTaskList: any, currentTask: number, setCurrentTask: any, timeLeft: number, setTimeLeft: any, timerOn: boolean, setTimerOn: any }
) {
    if (timeLeft <= 0) {
        nextTask(taskList, currentTask, setCurrentTask, setTimeLeft);
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
        <button onClick={() => toggleTimer(timerOn, setTimerOn)}                            >Start/Stop</button>    <br />
        <button onClick={() => resetTask(taskList, currentTask, setTimeLeft)}               >Reset Task</button>    <br />
        <button onClick={() => nextTask(taskList, currentTask, setCurrentTask, setTimeLeft)}>Skip Task</button>     <br />
    </div>
}

export default TimerControl;
