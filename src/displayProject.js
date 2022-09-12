import { addElement } from "./buildingblocks";
import { findObject, createObject } from "./storage";
import { buildTask } from "./displayTask";
import { deleteProjectButton, projectFilterButton } from "./formsAndButtons";



function buildProject(projectString, filterName=null) {
    
    let project = createObject(projectString);
    
    project.getTasks();  
    
    switch (filterName) {
        case 'Alphabetically':
            
            project.tasks.sort((taskA, taskB)=> taskA.title.localeCompare(taskB.title))
            break;
        case 'Due Date':
            
            project.tasks.sort((taskA, taskB)=> new Date(taskA.dueDate) - new Date(taskB.dueDate))
            break;
        case 'Priority':
            
            project.tasks.sort((taskA, taskB)=> taskA.priority - taskB.priority)
            break;
        default:
            
            break
    }
    
    let projectContainer = addElement('div');
    projectContainer.classList.add('project-container');
    let projectTitle = addElement('div');
    projectTitle.classList.add('project-title');
    
    let activeTasksContainer = addElement('div');
    activeTasksContainer.classList.add('project-tasks');
    let completedTasksContainer = addElement('div');
    completedTasksContainer.classList.add('project-tasks', 'completed');

    project.tasks.forEach(task => {
        if(task.completed == false){
            activeTasksContainer.appendChild(buildTask(task))
        } else {
            completedTasksContainer.appendChild(buildTask(task));
        }
        });

    let deleteProject = addElement('span', 'delete_forever')
    deleteProject.id = 'delete-project';
    deleteProject.classList.add('material-icons', 'md-36', 'red');

    projectTitle.appendChild(buildTaskfilterDropdown());
    projectTitle.appendChild(addElement('h1', project.title))
    projectContainer.appendChild(projectTitle);
    
    
    if(project.title != 'Inbox'){
        projectTitle.appendChild(deleteProject);
        
    }
    projectContainer.appendChild(activeTasksContainer);
    projectContainer.appendChild(completedTasksContainer);
    
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

function showProject(projectTitle, filterName=null){
    
    document.body.appendChild(addElement('div')).classList.add('content');
    const root = document.getElementsByClassName('content')[0];
    root.appendChild(buildProject(findObject(projectTitle, 'project'), filterName));
    if(projectTitle != 'Inbox'){        
        deleteProjectButton()
    }
    projectFilterButton()
}

function buildTaskfilterDropdown() {
    let dropDown = addElement('div');
    dropDown.classList.add('filter-dropdown');
    let filterIcon = addElement('span', 'sort')
    filterIcon.classList.add('material-icons', 'md-36')
    let dropDownButton = addElement('div');
    dropDownButton.classList.add('dropbtn-filter');
    dropDownButton.appendChild(filterIcon);
    let dropDownContent = addElement('div');
    dropDownContent.classList.add('filter-dropdown-content');
    ['Alphabetically', 'Due Date', 'Priority'].forEach( filter => {        
        dropDownContent.appendChild(addElement('div', filter));
    })

    dropDown.appendChild(dropDownButton);
    dropDown.appendChild(dropDownContent);

    return dropDown
}



export {
    buildProject, addProjectToNavbar, removeProjectFromNavbar, showProject
}