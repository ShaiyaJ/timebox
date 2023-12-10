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

function nextTask(taskList, currentTask, setCurrentTask, setTimeLeft) {
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

    return <>
        <h1>{timeLeft}</h1>
        <span>Current Task:</span> {taskList[currentTask].name}                                                         <br />
        <button onClick={() => toggleTimer(timerOn, setTimerOn)}                                >Start/Stop</button>    <br />
        <button onClick={() => resetTask(taskList, currentTask, setTimeLeft)}                   >Reset Task</button>    <br />
        <button onClick={() => nextTask(taskList, currentTask, setCurrentTask, setTimeLeft)}    >Skip Task</button>     <br />
    </>
}

export default TimerControl;
