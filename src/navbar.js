import { addElement } from './buildingblocks';
import { addProjectToNavbar } from './displayProject';
import { allProjects } from './storage';

function addTaskButton() {
    let addTaskButton = addElement('a', `\u{2795}`);
    addTaskButton.classList.add('float')
    addTaskButton.id = 'new-task';
    document.body.appendChild(addTaskButton);
}

function createNavBar(){    
    let navBarContainer = addElement('div');
    navBarContainer.classList.add('navbar');
    let navbarLinks = [['Inbox', `\u{1F4E5}`], ['Today', `\u{2605}`], ['Upcoming', `\u{1F4C5}`]];
    
    navbarLinks.forEach( link => navBarContainer.appendChild(createNavLink(link[0], link[1])));    
    navBarContainer.appendChild(createProjectsSection());
    document.body.appendChild(navBarContainer);
    addTaskButton();
}

function createNavLink(text, icon){
    let navLinkContainer = addElement('div');
    let navIcon = addElement('span', icon);
    let navLink = addElement('div', text);    
    navLink.id = text;
    navLinkContainer.appendChild(navLink);
    navLinkContainer.appendChild(navIcon);
    navLinkContainer.classList.add('navbarlink');
    return navLinkContainer;
}

function createProjectsSection(){
    let projectsContainer = addElement('div');
    projectsContainer.classList.add('projects-container');
    let projectsHeader = addElement('div');
    projectsHeader.classList.add('projects-header');
    projectsHeader.appendChild(addElement('h4', 'Projects'));
    let addProjectButton = addElement('span', `\u{2295}`);
    addProjectButton.id = 'show-projects-form';
    projectsHeader.appendChild(addProjectButton);    
    projectsContainer.appendChild(projectsHeader);
    projectsContainer.appendChild(newProjectForm());
    let projectsList = addElement('div');
    projectsList.classList.add('projects-list');
    existingProjectsNavLinks().forEach( e=> projectsList.appendChild(e));
    projectsContainer.appendChild(projectsList);
    
    return projectsContainer;
}

function existingProjectsNavLinks() {
    let projectLinks = [];

    if (allProjects().length > 0) {
        allProjects().forEach( project => {
            if (project.title != 'Inbox'){
                let projectLink = addElement('div', project.title);
                projectLink.id = `${project.title}`
                projectLink.classList.add('navbar-project');
                projectLinks.push(projectLink);
            }
        })
    }
    return projectLinks;
}



function newProjectForm(){
    let formContainer = addElement('div');
    formContainer.classList.add('projects-form');
    let newFormNameInput = addElement('input');
    newFormNameInput.setAttribute('type', 'text');
    newFormNameInput.setAttribute('placeholder', 'Project Name');
    newFormNameInput.id = 'name';
    let submitFormButton = addElement('button', 'Add Project');
    let cancelFormButton = addElement('button', 'Cancel');
    submitFormButton.id = 'add-project';
    cancelFormButton.id = 'cancel-form';
    formContainer.appendChild(newFormNameInput);
    formContainer.appendChild(submitFormButton);
    formContainer.appendChild(cancelFormButton);

    return formContainer;
}

export {
    createNavBar
}
