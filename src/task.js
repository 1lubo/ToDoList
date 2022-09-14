import { saveObject } from "./storage";
import { projectTaskNames } from "./storage";

function Task (title, project= 'Inbox', dueDate, priority = 4, completed = false, description = null) {
    this.type = 'task';
    this.project = project;
    this.title = title;
    this.dueDate = dueDate || new Date();
    this.priority = priority;
    this.completed = completed;
    this.description = description;

}

function validateTaskName(taskTitle, projectTitle){    

    if (taskTitle.length < 3) {
        return 'Task title must be at least 3 characters'
    } else if (projectTaskNames(projectTitle).includes(taskTitle)) {
        return 'Task with this name already exists'
    } 

    return true
}

function createTask(title, project, dueDate, priority, completed, description) {    
    
    let task = new Task(title, project, dueDate, priority, completed, description);
    saveObject(task);      
    return task;
}

export {Task, createTask, validateTaskName}