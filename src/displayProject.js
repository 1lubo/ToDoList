import { addElement } from "./buildingblocks";
import { findObject, createObject } from "./storage";
import { buildTask } from "./displayTask";
import { deleteProjectButton } from "./formsAndButtons";


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
    let deleteProject = addElement('button', 'Delete')
    deleteProject.id = 'delete-project';

    projectContainer.appendChild(projectTitle);
    
    if(project.title != 'Inbox'){
        projectContainer.appendChild(deleteProject);
        
    }
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
    document.querySelector('.projects-list').children[projectTitle].remove()
}

function showProject(projectTitle){
    
    document.body.appendChild(addElement('div')).classList.add('content');
    const root = document.getElementsByClassName('content')[0];
    root.appendChild(buildProject(findObject(projectTitle, 'project')));
    if(projectTitle != 'Inbox'){        
        deleteProjectButton()
    }
}



export {
    buildProject, addProjectToNavbar, removeProjectFromNavbar, showProject
}