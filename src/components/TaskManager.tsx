/*
 *      Responsible for adding, removing and modifying tasks in the timer 
 */

import React, { useEffect, useRef, useState } from "react";
import type { Task } from "./Timer";

function addTask(taskList: Task[], setTaskList: any) {
    setTaskList([
        ...taskList, 
        { name: "", duration: 1 }
    ]);
}

function editTask(taskList: Task[], setTaskList: any, index: number, value: Task) {
    if (value.duration <= 0 || Number.isNaN(value.duration)) {  // Range check to force value to "1" to avoid weird skipping behavior
        value.duration = 1;
    }

    setTaskList(
        taskList.map((task, idx) => {
            if (idx === index) {
                return value;
            } else {
                return task;
            }
        })
    );
}

function removeTask(taskList: Task[], setTaskList: any, currentTask, setCurrentTask, index: number) {    // FIXME 
    setTaskList(
        taskList.filter(t => taskList.indexOf(t) !== index)
    ); 

    if (index <= currentTask) {
        setCurrentTask(index);
    }
} 

function TaskManager(
    { taskList, setTaskList, currentTask, setCurrentTask, timeLeft, setTimeLeft }:
    { taskList: Task[], setTaskList: any, currentTask: number, setCurrentTask: any, timeLeft: number, setTimeLeft: any }
) {
    // ADDME:   debounce input to reduce writes to state
    //          also improves UI as empty durations can exist when debounced

    return <>
        {
            // Generating html for each task
            taskList.map((task, idx) => {                                                                                                                                               // ADDME: highlight current task
                return <div key={idx}>
                    <button onClick={ () => removeTask(taskList, setTaskList, currentTask, setCurrentTask, idx) }>X</button>
                    <input type="text"   value={task.name}     onChange={ (e) => editTask(taskList, setTaskList, idx, {name: e.target.value, duration: task.duration } ) } />
                    <input type="number" value={task.duration} onChange={ (e) => editTask(taskList, setTaskList, idx, {name: task.name, duration: parseInt(e.target.value) } ) } min={1} />
                </div>
            })
        }

        {/*Adding tasks*/} 
        
        <div>
            <button onClick={ () => addTask(taskList, setTaskList) }>+</button>
        </div>
    </>
}

export default TaskManager;