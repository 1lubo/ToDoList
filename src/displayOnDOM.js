import { addElement } from "./buildingblocks";
import { createObject } from "./storage";

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

function buildTask(task) {
    var taskElements = [];    
    var task = createObject(task);
    var taskContainer = addElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.classList.add(`priority-${task.priority}`);    
    taskElements.push(buildTaskHeader(task.title, task.priority));
    var taskDueDate = addElement('div', task.dueDate);
    taskDueDate.classList.add('task-date');
    taskElements.push(taskDueDate);
    taskElements.forEach( element => taskContainer.appendChild(element));

    return taskContainer;
}

function buildProject(project) {
    
    var project = createObject(project);
    project.getTasks();    
    var projectContainer = addElement('div');
    projectContainer.classList.add('project-container');
    var projectTitle = addElement('h1', project.title);
    projectTitle.classList.add('project-title');
    var tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    project.tasks.forEach(task => tasksContainer.appendChild(buildTask(task)));

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(tasksContainer);

    return projectContainer;

}

function displayTaskDetail(task){

}

export {
    buildTask, buildProject
}