import { addElement } from "./buildingblocks";
import { createObject } from "./storage";

function buildTask(task) {
    var taskElements = [];
    var task = createObject(task);
    var taskContainer = addElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.classList.add(`priority-${task.priority}`);
    var taskTitle = addElement('h1', task.title);
    taskTitle.classList.add('task-title');
    taskElements.push(taskTitle);
    var taskDueDate = addElement('div', task.dueDate);
    taskDueDate.classList.add('task-date');
    taskElements.push(taskDueDate);
    taskElements.forEach( element => taskContainer.appendChild(element));

    return taskContainer;
}

export {
    buildTask
}