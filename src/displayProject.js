import { addElement } from "./buildingblocks";
import { findObject, createObject } from "./storage";
import { buildTask } from "./displayTask";


function buildProject(projectString) {
    
    let project = createObject(projectString);
    project.getTasks();    
    let projectContainer = addElement('div');
    projectContainer.classList.add('project-container');
    let projectTitle = addElement('h1', project.title);
    projectTitle.classList.add('project-title');
    let tasksContainer = addElement('div');
    tasksContainer.classList.add('project-tasks');
    project.tasks.forEach(task => tasksContainer.appendChild(buildTask(task)));

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(tasksContainer);

    return projectContainer;

}

function addProjectToNavbar(projectTitle){
    let project = addElement('div', projectTitle);
    project.classList.add('navbar-project');
    project.id = `${projectTitle}`
    let projectList = document.getElementsByClassName('projects-list')[0]
    projectList.appendChild(project);
}

function removeProjectFromNavbar(projectTitle) {
    let project = document.getElementById(`project-${projectTitle}`)
    project.remove();
}

function showProject(projectTitle){
    
    document.body.appendChild(addElement('div')).classList.add('content');
    const root = document.getElementsByClassName('content')[0];
    root.appendChild(buildProject(findObject(projectTitle, 'project')));
}



export {
    buildProject, addProjectToNavbar, removeProjectFromNavbar, showProject
}