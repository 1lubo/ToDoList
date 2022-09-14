import { addElement } from './buildingblocks';
import { allProjects } from './storage';

/* build floating button for adding new tasks */
function addTaskButton() {
  const addNewTaskButton = addElement('a', 'task');
  addNewTaskButton.classList.add('float', 'material-icons');
  addNewTaskButton.id = 'new-task';
  document.body.appendChild(addNewTaskButton);
}

/* build navigation hamburger button to show on smaller screens */
function addNavHamburger() {
  const hamburger = addElement('a', 'menu_open');
  hamburger.classList.add('material-icons', 'hamburger-float', 'menu-hidden');
  hamburger.id = 'responsive-menu';
  document.body.appendChild(hamburger);
}

/* create a navbar navigation link container */
function createNavLink(text, icon) {
  const navLinkContainer = addElement('div');
  const navIcon = addElement('span', icon);
  navIcon.classList.add('material-icons');
  const navLink = addElement('div', text);
  navLink.id = text;
  navLinkContainer.appendChild(navLink);
  navLinkContainer.appendChild(navIcon);
  navLinkContainer.classList.add('navbarlink');
  return navLinkContainer;
}

/* create form for adding a new project */
function newProjectForm() {
  const formContainer = addElement('div');
  formContainer.classList.add('projects-form');
  const newFormNameInput = addElement('input');
  newFormNameInput.setAttribute('type', 'text');
  newFormNameInput.setAttribute('placeholder', 'New Project Name');
  newFormNameInput.id = 'name';
  const submitFormButton = addElement('button', 'Add Project');
  const cancelFormButton = addElement('button', 'Cancel');
  submitFormButton.id = 'add-project';
  cancelFormButton.id = 'cancel-form';
  const projectFormButtons = addElement('div');
  projectFormButtons.classList.add('projects-form-buttons');
  formContainer.appendChild(newFormNameInput);
  projectFormButtons.appendChild(submitFormButton);
  projectFormButtons.appendChild(cancelFormButton);
  formContainer.appendChild(projectFormButtons);

  return formContainer;
}

/* crate list of navigation links for all existing projects */

function existingProjectsNavLinks() {
  const projectLinks = [];

  if (allProjects().length > 0) {
    allProjects().forEach((project) => {
      if (project.title !== 'Inbox') {
        const projectLink = addElement('div', project.title);
        projectLink.id = `${project.title}`;
        projectLink.classList.add('navbar-project');
        projectLinks.push(projectLink);
      }
    });
  }
  return projectLinks;
}

/* create navbar section to show existing project names */
function createProjectsSection() {
  const projectsContainer = addElement('div');
  projectsContainer.classList.add('projects-container');
  const projectsHeader = addElement('div');
  projectsHeader.classList.add('projects-header');
  projectsHeader.appendChild(addElement('h4', 'Projects'));
  const addProjectButton = addElement('span', 'library_add');
  addProjectButton.classList.add('material-icons');
  addProjectButton.id = 'show-projects-form';
  projectsHeader.appendChild(addProjectButton);
  projectsContainer.appendChild(projectsHeader);
  projectsContainer.appendChild(newProjectForm());
  const projectsList = addElement('div');
  projectsList.classList.add('projects-list');
  /* crate list of navigation links for all existing projects */
  existingProjectsNavLinks().forEach((e) => projectsList.appendChild(e));
  projectsContainer.appendChild(projectsList);

  return projectsContainer;
}

/* create navigation bar */
function createNavBar() {
  const navBarContainer = addElement('div');
  navBarContainer.classList.add('navbar', 'hide-on-mobile');
  const navbarLinks = [['Inbox', 'all_inbox'], ['Today', 'star_rate'], ['Upcoming', 'schedule']];

  navbarLinks.forEach((link) => navBarContainer.appendChild(createNavLink(link[0], link[1])));
  navBarContainer.appendChild(createProjectsSection());
  document.body.appendChild(navBarContainer);
  addTaskButton(); /* add new task button when creating navbar */
  addNavHamburger(); /* add navigation hamburger button when creating navbar */
}

/* set the selected navigation bar item to active */
function setActive(project) {
  const navbar = document.querySelector('.navbar');

  if (navbar.contains(document.querySelector('.active'))) {
    navbar.querySelector('.active').classList.remove('active');
  }

  if (navbar.querySelector(`#${project}`).classList.contains('navbar-project')) {
    navbar.querySelector(`#${project}`).classList.add('active');
  } else {
    navbar.querySelector(`#${project}`).parentNode.classList.add('active');
  }
}

export {
  createNavBar, setActive,
};
