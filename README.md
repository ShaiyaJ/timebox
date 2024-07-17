# Timebox
A simple [timeboxing](https://en.wikipedia.org/wiki/Timeboxing#In_personal_time_management) tool that can be accessed using the browser.

[Click here to open it](https://shaiyaj.github.io/timebox/).

This tool uses react and is served using gh-pages.

## About
Timeboxing is a time management technique which limits a tasks to a fixed, realistic, time. Then, using a timer, you can finish the task in this strict deadline before moving onto the next one. 

Some timeboxing methods also break tasks down further - allocating time to these "decomposed tasks" separately. 

Here is a very simple example of using timeboxing for studying:

1. Read the biology textbook for 20 minutes
2. Practise a physics paper for 15 minutes
3. Watch YouTube for 10 minutes

This plan will be repeated in a cycle until some sort of "win condition" is met (in this case it would probably be along the lines of "finish x chapter of the textbook and complete all the questions in the physics paper").

You can also use this same technique to ensure that you are productive with your hobbies during leisure time.

1. Plan the timeboxing app for 20 minutes
2. Read "Software Engineering: A Practitioner's Approach" for 20 minutes
3. Watch 20 minutes of Mahjong strategy videos

This is the tasks I used to ensure that this app got planned and written while also maintaining a certain level of productivity in my other hobbies.

This tool helps you to do timeboxing without needing to fiddle with phone timers or egg timers (like I did while writing it). It's built for timeboxing. You add your tasks, set their duration (in seconds) then start your timer. The app is cyclical, once the duration of the final task in the list has elapsed, it will go to the beginning of the task list again. 

These qualities allow for certain useful timers to be created - an example of the Pomodoro Technique can be found below:
- Task 1 - Work (20 min)
- Task 2 - Rest (5 min)  

With just these inputs, you already have a Pomodoro Technique timer which will keep looping in a circle.

## Use
Go to https://shaiyaj.github.io/timebox/ to start the app.

You will then see two main areas of the application, an area which displays the timer and controls for the timer, and an area which displays the tasks.

Add the tasks that you want to complete, and set the time (in seconds) that you want to dedicate to each task.

Then, move up to the timer area, start/stop will toggle the timer on or off, reset task will reset the timer *for that task* and skip task will move the timer onto the next task.

## Planned features
This project was completed as apart of a series of projects which I dedicate only 2 days to (from the beginning of planning, to learning the technologies involved and right to the end of development). For this reason, the application right now is pretty bare bones. I wish to add the following features in the future.

[ ] Occasionally saving state in localStorage and reloading this state on app load 

[ ] Adding a preset loader (perhaps even with custom presets?)

[ ] Code review by a react developer in order to learn the best practices
