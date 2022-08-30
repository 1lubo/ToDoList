import { addElement } from "./buildingblocks";

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

export {
    buildProject
}