import { addElement } from "./buildingblocks";
import { createObject, allTasks, deleteObject } from "./storage";
import { displayDateFormat, dateIsToday, isInFuture } from "./dateHelper";
import { closeExpandedTaskButton, closeExpandedTask, closeExpandedTaskWindow, completeTask, uncompleteTask } from "./formsAndButtons";
const {format, add} = require('date-fns');
import { newTaskModal, showTaskModal } from "./modal";

function buildTaskHeader(title, completed, description){
    let taskHeader = addElement('div');
    taskHeader.classList.add('task-header');    
    let taskTitle = addElement('h2', title);
    taskTitle.classList.add('task-title'); 
    if (completed) {
        taskTitle.classList.add('completed');
    }    
    taskHeader.appendChild(taskTitle);
    if (description) {
        let taskDescription = addElement('div', description);
        taskDescription.classList.add('task-description');
        taskHeader.appendChild(taskDescription);
    }

    return taskHeader
    
}

function buildExpandedTaskHeader(title, description){
    let taskHeader = []
    //taskHeader.classList.add('task-header');
    let taskTitle = addElement('input');
    taskTitle.setAttribute('type', 'text');
    taskTitle.value = title;
    taskTitle.id = 'task-title'
    let taskDescription = addElement('input');
    taskDescription.setAttribute('type', 'text');
    taskDescription.value = description;
    taskDescription.id = 'task-description'   
    taskHeader.push(taskTitle);
    taskHeader.push(taskDescription);    

    return taskHeader
}

function buildTaskFooter(dueDate){
    let taskFooter = addElement('div');
    taskFooter.classList.add('task-footer'); 
    dueDate ||= new Date();
    let date = displayDateFormat(dueDate);
    let taskDueDate = addElement('div', date);
    let dateIcon = addElement('span');    
    taskDueDate.classList.add('task-date');
    taskFooter.appendChild(taskDueDate);
    
    return taskFooter;

}

function buildExpandedTaskFooter(dueDate, priority) {
    let taskFooter = []
    //taskFooter.classList.add('task-footer'); 
    let taskDueDate = addElement('input');
    taskDueDate.setAttribute('type', 'date')
    taskDueDate.value = dueDate;
    taskDueDate.id = 'task-dueDate';

    taskFooter.push(taskDueDate);    
    taskFooter.push(buildTaskPriorityDropdown(priority));
    
    return taskFooter;
}

function buildTaskPriorityDropdown(priority=null){
    let text = '';
    switch (priority) {
        case 1:
            text = 'priority-1'
            break;
        case 2:
            text = 'priority-2'
            break;
        case 3:
            text = 'priority-3'
            break;
        default:
            text = 'priority-4'
    }
    let dropDown = addElement('div');
    dropDown.classList.add('dropdown');
    let dropDownButton = addElement('div', `\u{2691}`);
    dropDownButton.classList.add('dropbtn', text);
    let dropDownContent = addElement('div');
    dropDownContent.classList.add('dropdown-content');
    let high = addElement('div', 'Priority 1 - High');
    high.id = "1";
    let medium = addElement('div', 'Priority 2 - Medium');
    medium.id = "2";
    let low = addElement('div', 'Priority 3 - Low');
    low.id = "3";
    let noPriority = addElement('div', 'Priority 4 - None');
    noPriority.id = "4";
    dropDown.appendChild(dropDownButton);    
    dropDown.appendChild(dropDownContent);
    dropDownContent.appendChild(high);
    dropDownContent.appendChild(medium);
    dropDownContent.appendChild(low);
    dropDownContent.appendChild(noPriority);

    return dropDown;

}



function buildTask(task) {
    let taskElements = [];        
    let taskContainer = addElement('div');
    taskContainer.classList.add('task-details-container');
    taskContainer.classList.add(`priority-${task.priority}`);    
    taskElements.push(buildTaskHeader(task.title, task.completed, task.description));      
    taskElements.push(buildTaskFooter(task.dueDate));
    taskElements.forEach( element => taskContainer.appendChild(element));
    taskContainer.id = task.title;    
    let container = addElement('div');
    container.classList.add('task-container')  
    let taskCompleted = addElement('input');
    taskCompleted.setAttribute('type', 'checkbox');
    if (task.completed) {
        taskCompleted.setAttribute('checked', 'true');
        }
    
    taskCompleted.classList.add(`priority-${task.priority}`);
    taskCompleted.addEventListener('click', ()=> {
        if(taskCompleted.checked){            
            completeTask(task.title);            
            
        } else {  
            uncompleteTask(task.title);
        }
    })

    container.appendChild(taskCompleted)
    container.appendChild(taskContainer);    
    return container;
}

function buildTaskAfterEdit(task) {
    let taskElements = [];
    taskElements.push(buildTaskHeader(task.title, task.completed, task.description));      
    taskElements.push(buildTaskFooter(task.dueDate));
    return taskElements;
}

function buildExpandedTask(task) {
    
    let taskElements = [];        
    let header = buildExpandedTaskHeader(task.title, task.description);
    let footer = buildExpandedTaskFooter(task.dueDate, task.priority);
    taskElements.push(header[0], header[1]); 
    taskElements.push(footer[0], footer[1]);
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
    let header = addElement('h1', 'Today');
    header.classList.add('project-title');
    header.appendChild(addElement('span', `\u{269D}`));    
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
    let upcomingContainer = addElement('div');
    upcomingContainer.classList.add('project-container');
    let header = addElement('h1', 'Upcoming');    
    header.classList.add('project-title');
    allTasks().forEach(function(task){
        if(isInFuture(task.dueDate)) {
            tasksContainer.appendChild(buildTask(task))
        }
    })

    upcomingContainer.appendChild(header);
    upcomingContainer.appendChild(tasksContainer);
    content.appendChild(upcomingContainer);    

    document.body.appendChild(content);
}

function addNewTaskToContainer(task) {
    let root = document.getElementsByClassName('project-tasks')[0];
    let newTask = buildTask(task);
    newTask.lastChild.addEventListener('click', () => {
        showTaskModal(task.title);
    })    
    root.appendChild(newTask);
}

function removeTaskContainer(taskTitle) {
    let root = document.getElementsByClassName('project-tasks')[0];

    if (deleteObject(taskTitle, 'task')) {
        let taskContainer = root.querySelector(`#${taskTitle}`);
        taskContainer.parentElement.remove();
        alert(`Task (${taskTitle}) deleted successfully!`);
}
    
}

function showTask(taskTitle){
    let taskContainer = document.getElementById(taskTitle)
    taskContainer.classList.add('expanded');
    taskContainer.textContent = '';    
    let task = allTasks().find(e => e.title = taskTitle);    
    buildExpandedTask(task).forEach( e => taskContainer.appendChild(e));
    closeExpandedTaskButton(taskTitle);    
  
}



export {
    buildTask, showInbox, showToday, showUpcoming, addNewTaskToContainer, showTask, buildTaskAfterEdit, buildExpandedTask, 
    buildTaskPriorityDropdown, removeTaskContainer
}