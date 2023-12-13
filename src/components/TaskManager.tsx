/*
 *      Responsible for adding, removing and modifying tasks in the timer 
 */

import React, { useEffect, useRef, useState } from "react";
import type { Task } from "./Timer";

function addTask(taskList: Task[], setTaskList: any) {
    setTaskList([
        ...taskList, 
        { name: "", duration: 0 }
    ]);
}

function editTask(taskList: Task[], setTaskList: any, currentTask: number, setTimeLeft: any, index: number, value: Task) {
    if (Number.isNaN(value.duration)) {     // Sets a value if NaN to force <input> to display 00:00:00 instead of --:-- 
        value.duration = 0;                 // while also avoiding errors in the console due to NaN type
    }

    setTaskList(
        taskList.map((task, idx) => {
            if (idx === index) {    // Acts as a filter, returning the new task if idx === index, otherwise returning old tasks
                return value;
            } else {
                return task;
            }
        })
    );

    if (index === currentTask) {  // Quality of life feature that updates the current task, avoiding awkward "skip task" abuse
        setTimeLeft(value.duration);
    }
}

function removeTask(taskList: Task[], setTaskList: any, currentTask: number, setCurrentTask: any, index: number) { 
    if (taskList.length === 1) {        // Avoiding errors caused by having no tasks in tasklist
        setTaskList([
            {name: "", duration: 0}
        ]);
        
        return;
    }

    setTaskList(
        taskList.filter(t => taskList.indexOf(t) !== index)
    ); 

    if (index <= currentTask) {
        setCurrentTask((index+1) % taskList.length-1);
    }
} 

function TaskManager(
    { taskList, setTaskList, currentTask, setCurrentTask, timeLeft, setTimeLeft }:
    { taskList: Task[], setTaskList: any, currentTask: number, setCurrentTask: any, timeLeft: number, setTimeLeft: any }
) {
    // ADDME:   debounce input to reduce writes to state
    //          also improves UI as empty durations can exist when debounced

    return <div className="task-container">
        {
            // Generating html for each task
            taskList.map((task, idx) => {
                const isHighlighed = idx === currentTask ? "task-container-active" : "";                                                                                                                                     // ADDME: highlight current task
                const cssClasses = `task ${isHighlighed}`;

                const h = Math.floor(task.duration / 3600).toString();
                const m = Math.floor(task.duration % 3600 / 60).toString();
                const s = Math.floor(task.duration % 3600 % 60).toString();
            
                const dh = h.length === 1 ? `0${h}` : h;
                const dm = m.length === 1 ? `0${m}` : m;
                const ds = s.length === 1 ? `0${s}` : s;

                return <div 
                    className={cssClasses}
                    key={idx}
                >
                    <button className="delete-task" onClick={ () => removeTask(taskList, setTaskList, currentTask, setCurrentTask, idx) }>X</button>
                    <input  className="name-task" type="text"   value={task.name}     onChange={ (e) => editTask(taskList, setTaskList, currentTask, setTimeLeft, idx, {name: e.target.value, duration: task.duration } ) } />
                    <input  className="duration-task" type="time" value={`${dh}:${dm}:${ds}`} onChange={ (e) => {
                        const rawDuration = e.target.value.split(":");

                        const hours   = parseInt(rawDuration[0]);
                        const minutes = parseInt(rawDuration[1]);
                        const seconds = parseInt(rawDuration[2]);

                        const duration = (hours*60*60) + (minutes*60) + seconds;

                        editTask(taskList, setTaskList, currentTask, setTimeLeft, idx, {name: task.name, duration: duration } ) } 
                    } min={"00:00:00"} step={1} />
                </div>
            })
        }

        {/*Adding tasks*/} 
        
        <div>
            <button onClick={ () => addTask(taskList, setTaskList) }>+</button>
        </div>
    </div>
}

export default TaskManager;