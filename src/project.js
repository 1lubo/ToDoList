import { existingProjectNames, allTasks } from "./storage";
import { saveObject } from "./storage";

function Project (title) {
    this.type = 'project';
    this.title = title;
    this.tasks = [];
    this.completed = false;
}

Project.prototype.getTasks = function () {    
    var project = this;

    allTasks().forEach(function(task){
        if(task.project == project.title){
            project.tasks.push(task);
        }
    })
    
}

function validateName(projectTitle){    

    if (projectTitle.length < 3) {
        return 'Project title must be at least 3 characters'
    } else if (existingProjectNames().includes(projectTitle)) {
        return 'Project with this name already exists'
    } 

    return true
}

function createProject(projectTitle){
    let project = new Project(projectTitle);
    saveObject(project);

    return project;
}



export {Project, validateName, createProject}