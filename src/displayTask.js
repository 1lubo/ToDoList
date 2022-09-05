import { addElement } from "./buildingblocks";
import { createObject, allTasks } from "./storage";
import { displayDateFormat, dateIsToday, isInFuture } from "./dateHelper";
import { closeExpandedTaskButton, closeExpandedTask, closeExpandedTaskWindow } from "./formsAndButtons";
const {format} = require('date-fns');
import { newTaskModal } from "./modal";

function buildTaskHeader(title, priority){
    let taskHeader = addElement('div');
    taskHeader.classList.add('task-header');
    let taskCompleted = addElement('input');
    taskCompleted.setAttribute('type', 'checkbox');
    taskCompleted.classList.add(`priority-${priority}`);
    taskCompleted.classList.add('checkmark');
    let taskTitle = addElement('h1', title);
    taskTitle.classList.add('task-title');
    taskHeader.appendChild(taskCompleted);
    taskHeader.appendChild(taskTitle);

    return taskHeader
    
}

function buildExpandedTaskHeader(title, description){
    let taskHeader = addElement('div');
    taskHeader.classList.add('task-header');
    let taskTitle = addElement('input');
    taskTitle.setAttribute('type', 'text');
    taskTitle.value = title;
    taskTitle.id = 'task-title'
    let taskDescription = addElement('input');
    taskDescription.setAttribute('type', 'text');
    taskDescription.value = description;
    taskDescription.id = 'task-description'
    //let closeExpandedTask = addElement('span', `\u{2304}`);
    //closeExpandedTask.id = 'close-expanded-task';
    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(taskDescription);
    //taskHeader.appendChild(closeExpandedTask);

    return taskHeader
}

function buildTaskFooter(dueDate){
    let taskFooter = addElement('div');
    taskFooter.classList.add('task-footer'); 
    dueDate ||= new Date();
    let date = displayDateFormat(dueDate);
    let taskDueDate = addElement('div', date);
    let dateIcon = addElement('span');
    dateIcon.innerText = `\u{1F4C5}`
    taskDueDate.appendChild(dateIcon);
    taskDueDate.classList.add('task-date');
    taskFooter.appendChild(taskDueDate);
    
    return taskFooter;

}

function buildExpandedTaskFooter(dueDate) {
    let taskFooter = addElement('div');
    taskFooter.classList.add('task-footer'); 
    let taskDueDate = addElement('input');
    taskDueDate.setAttribute('type', 'date')
    taskDueDate.value = dueDate;
    taskDueDate.id = 'task-dueDate';

    taskFooter.appendChild(taskDueDate);
    
    return taskFooter;
}

function buildTask(task) {
    let taskElements = [];        
    let taskContainer = addElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.classList.add(`priority-${task.priority}`);    
    taskElements.push(buildTaskHeader(task.title, task.priority));      
    taskElements.push(buildTaskFooter(task.dueDate));
    taskElements.forEach( element => taskContainer.appendChild(element));
    taskContainer.id = task.title;

    return taskContainer;
}

function buildTaskAfterEdit(task) {
    let taskElements = [];
    taskElements.push(buildTaskHeader(task.title, task.priority));      
    taskElements.push(buildTaskFooter(task.dueDate));
    return taskElements;
}

function buildExpandedTask(task) {
    let taskElements = [];
    taskElements.push(buildExpandedTaskHeader(task.title, task.description));      
    taskElements.push(buildExpandedTaskFooter(task.dueDate));
    return taskElements;

}

function showInbox() {
    let content = document.createElement('div');
    content.classList.add('content');
    let tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    allTasks().forEach(function(task){
        if(task.project == 'Inbox') {
            tasksContainer.appendChild(buildTask(task))
        }
    })
    content.appendChild(tasksContainer);

    document.body.appendChild(content);
}

function showToday() {
    let content = document.createElement('div');
    content.classList.add('content');
    let todayContainer = addElement('div');
    todayContainer.classList.add('project-container');
    let header = addElement('div');
    header.appendChild(addElement('span', `\u{269D}`));
    header.appendChild(addElement('h1', 'Today'));
    header.appendChild(addElement('div', format(new Date(),'MMM-do')));
    
    let tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    allTasks().forEach(function(task){
        if(dateIsToday(task.dueDate)) {
            tasksContainer.appendChild(buildTask(task))
        }
    })

    todayContainer.appendChild(header);
    todayContainer.appendChild(tasksContainer);
    content.appendChild(todayContainer);

    document.body.appendChild(content);
}

function showUpcoming() {
    let content = document.createElement('div');
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

function addNewTaskToContainer(task) {
    let root = document.getElementsByClassName('project-tasks')[0];
    root.appendChild(buildTask(task));
}

function showTask(taskTitle){
    let taskContainer = document.getElementById(taskTitle)
    taskContainer.classList.add('expanded');
    taskContainer.textContent = '';    
    let task = allTasks().find(e => e.title = taskTitle);
    buildExpandedTask(task).forEach( e => taskContainer.appendChild(e));
    closeExpandedTaskButton(taskTitle);
    //closeExpandedTaskWindow(taskTitle);
  
}



export {
    buildTask, showInbox, showToday, showUpcoming, addNewTaskToContainer, showTask, buildTaskAfterEdit, buildExpandedTask
}