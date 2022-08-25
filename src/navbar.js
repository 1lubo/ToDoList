import { addElement } from './buildingblocks';

function createNavLink(text){
    const navLink = addElement('div', text);
    navLink.classList.add('navbarlink');
    navLink.id = text;
    return navLink;
}

function createNavBar(){
    //const header = addElement(['header']);
    const navBarContainer = addElement('div');
    navBarContainer.classList.add('navbar');
    var navbarLinks = ['Home', 'Today', 'Upcoming', 'Projects', 'Add Project'];
    
    navbarLinks.forEach( link => navBarContainer.appendChild(createNavLink(link)));    

    return navBarContainer;
}

export {
    createNavBar
}
