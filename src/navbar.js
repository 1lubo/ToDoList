import { addElement } from './buildingblocks';

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
    projectsHeader.appendChild(addElement('span', `\u{2295}`));
    projectsContainer.appendChild(projectsHeader);
    projectsContainer.appendChild(addElement('div')).classList.add('project-list');

    return projectsContainer;
}

function createNavBar(){    
    let navBarContainer = addElement('div');
    navBarContainer.classList.add('navbar');
    let navbarLinks = [['Inbox', `\u{1F4E5}`], ['Today', `\u{2605}`], ['Upcoming', `\u{1F4C5}`]];
    
    navbarLinks.forEach( link => navBarContainer.appendChild(createNavLink(link[0], link[1])));    
    navBarContainer.appendChild(createProjectsSection());
    document.body.appendChild(navBarContainer);
    
}

export {
    createNavBar
}
