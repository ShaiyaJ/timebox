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

function editTask(taskList: Task[], setTaskList: any, index: number, value: Task) {
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

function removeTask(taskList: Task[], setTaskList: any, index: number) {    // FIXME 
    setTaskList(
        taskList.filter(t => taskList.indexOf(t) !== index)
    ); 
} 

function TaskManager(
    { taskList, setTaskList, currentTask, setCurrentTask, timeLeft, setTimeLeft }:
    { taskList: Task[], setTaskList: any, currentTask: number, setCurrentTask: any, timeLeft: number, setTimeLeft: any }
) {
    return <>
        {
            // Generating html for each task
            taskList.map((task, idx) => {                                                                                                                                               // ADDME: highlight current task
                return <div key={idx}>
                    <button onClick={ () => removeTask(taskList, setTaskList, idx) }>X</button>
                    <input type="text"   value={task.name}     onChange={ (e) => editTask(taskList, setTaskList, idx, {name: e.target.value, duration: task.duration } ) } />
                    <input type="number" value={task.duration} onChange={ (e) => editTask(taskList, setTaskList, idx, {name: task.name, duration: parseInt(e.target.value) } ) } />
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