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

function editTask(taskList: Task[], setTaskList: any, currentTask: number, setTimeLeft: any, index: number, value: Task) {
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

    if (index === currentTask) {  // Quality of life feature that updates the current task, avoiding awkward "skip task" abuse
        setTimeLeft(value.duration);
    }
}

function removeTask(taskList: Task[], setTaskList: any, currentTask: number, setCurrentTask: any, index: number) { 
    if (taskList.length === 1) {        // Avoiding errors caused by having no tasks in tasklist
        setTaskList([
            {name: "", duration: 1}
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

                return <div 
                    className={cssClasses}
                    key={idx}
                >
                    <button className="delete-task" onClick={ () => removeTask(taskList, setTaskList, currentTask, setCurrentTask, idx) }>X</button>
                    <input  className="name-task" type="text"   value={task.name}     onChange={ (e) => editTask(taskList, setTaskList, currentTask, setTimeLeft, idx, {name: e.target.value, duration: task.duration } ) } />
                    <input  className="duration-task" type="number" value={task.duration} onChange={ (e) => editTask(taskList, setTaskList, currentTask, setTimeLeft, idx, {name: task.name, duration: parseInt(e.target.value) } ) } min={1} />
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