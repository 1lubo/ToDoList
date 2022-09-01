import { addElement } from "./buildingblocks";
import { createObject, allTasks } from "./storage";
import { displayDateFormat, dateIsToday, isInFuture } from "./dateHelper";

function buildTaskHeader(title, priority){
    var taskHeader = addElement('div');
    taskHeader.classList.add('task-header');
    var taskCompleted = addElement('input');
    taskCompleted.setAttribute('type', 'checkbox');
    taskCompleted.classList.add(`priority-${priority}`);
    taskCompleted.classList.add('checkmark');
    var taskTitle = addElement('h1', title);
    taskTitle.classList.add('task-title');
    taskHeader.appendChild(taskCompleted);
    taskHeader.appendChild(taskTitle);

    return taskHeader
    
}

function buildTaskFooter(dueDate){
    var taskFooter = addElement('div');
    taskFooter.classList.add('task-footer');    
    var date = displayDateFormat(dueDate);
    var taskDueDate = addElement('div', date);
    var dateIcon = addElement('span');
    dateIcon.innerText = `\u{1F4C5}`
    taskDueDate.appendChild(dateIcon);
    taskDueDate.classList.add('task-date');
    taskFooter.appendChild(taskDueDate);
    
    return taskFooter;

}

function buildTask(task) {
    var taskElements = [];        
    var taskContainer = addElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.classList.add(`priority-${task.priority}`);    
    taskElements.push(buildTaskHeader(task.title, task.priority));      
    taskElements.push(buildTaskFooter(task.dueDate));
    taskElements.forEach( element => taskContainer.appendChild(element));

    return taskContainer;
}

function showInbox() {
    var content = document.createElement('div');
    content.classList.add('content');
    let tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    allTasks().forEach(function(task){
        if(task.project == null) {
            tasksContainer.appendChild(buildTask(task))
        }
    })
    content.appendChild(tasksContainer);

    document.body.appendChild(content);
}

function showToday() {
    var content = document.createElement('div');
    content.classList.add('content');
    let tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    allTasks().forEach(function(task){
        if(dateIsToday(task.dueDate)) {
            tasksContainer.appendChild(buildTask(task))
        }
    })
    content.appendChild(tasksContainer);

    document.body.appendChild(content);
}

function showUpcoming() {
    var content = document.createElement('div');
    content.classList.add('content');
    let tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    allTasks().forEach(function(task){
        if(isInFuture(task.dueDate)) {
            tasksContainer.appendChild(buildTask(task))
        }
    })
    content.appendChild(tasksContainer);

    document.body.appendChild(content);
}


export {
    buildTask, showInbox, showToday, showUpcoming
}