import { addElement } from './buildingblocks';
import { addProjectToNavbar } from './displayProject';
import { allProjects } from './storage';


function addTaskButton() {
    let addTaskButton = addElement('a', 'task');
    addTaskButton.classList.add('float', 'material-icons')
    addTaskButton.id = 'new-task';
    document.body.appendChild(addTaskButton);
    
}

function addNavHamburger() {
    let hamburger = addElement('a', 'menu_open');
    hamburger.classList.add('material-icons', 'hamburger-float', 'menu-hidden');
    hamburger.id = 'responsive-menu';
    document.body.appendChild(hamburger);
}

function createNavBar(){    
    let navBarContainer = addElement('div');
    navBarContainer.classList.add('navbar', 'hide-on-mobile');
    let navbarLinks = [['Inbox', 'all_inbox'], ['Today', 'star_rate'], ['Upcoming', 'schedule']];
    
    navbarLinks.forEach( link => navBarContainer.appendChild(createNavLink(link[0], link[1])));    
    navBarContainer.appendChild(createProjectsSection());
    document.body.appendChild(navBarContainer);
    addTaskButton();
    addNavHamburger();
}

function createNavLink(text, icon){
    let navLinkContainer = addElement('div');
    let navIcon = addElement('span', icon);
    navIcon.classList.add('material-icons')
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
    let addProjectButton = addElement('span', 'library_add');
    addProjectButton.classList.add('material-icons')
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
    newFormNameInput.setAttribute('placeholder', 'New Project Name');
    newFormNameInput.id = 'name';
    let submitFormButton = addElement('button', 'Add Project');
    let cancelFormButton = addElement('button', 'Cancel');
    submitFormButton.id = 'add-project';
    cancelFormButton.id = 'cancel-form';
    let projectFormButtons = addElement('div');
    projectFormButtons.classList.add('projects-form-buttons');
    formContainer.appendChild(newFormNameInput);
    projectFormButtons.appendChild(submitFormButton);
    projectFormButtons.appendChild(cancelFormButton);
    formContainer.appendChild(projectFormButtons);

    return formContainer;
}

function setActive(project) {
    
    let navbar = document.querySelector('.navbar');    

    if(navbar.contains(document.querySelector('.active'))) {           
        navbar.querySelector('.active').classList.remove('active');
        
    }    
    
    if(navbar.querySelector(`#${project}`).classList.contains('navbar-project')){
        navbar.querySelector(`#${project}`).classList.add('active'); 
        
    } else {
        navbar.querySelector(`#${project}`).parentNode.classList.add('active');
    }
    
}

export {
    createNavBar, setActive
}
