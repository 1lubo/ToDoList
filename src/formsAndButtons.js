import { Project,validateName, createProject } from "./project";
import { addProjectToNavbar, showProject } from "./displayProject";
import { removeContent } from "./buildingblocks";
import { showInbox, showToday, showUpcoming } from "./displayTask";

function showNewProjectForm(){    
    document.getElementsByClassName('projects-form')[0].classList.remove('hide');
    document.getElementsByClassName('projects-form')[0].classList.add('show');
}

function hideNewProjectForm(){
    document.getElementsByClassName('projects-form')[0].classList.remove('show');
    document.getElementsByClassName('projects-form')[0].classList.add('hide');
}

function createNewProjectButton() {

    document.getElementById('add-project').addEventListener('click', function (){
        if(validateName(getNameFromForm()) === true) {
            createProject(getNameFromForm());
            addProjectToNavbar(getNameFromForm());
            clearForm();
            hideNewProjectForm();
        } else {
            alert(validateName(getNameFromForm()))
    }
    })
}

function getNameFromForm() {
    
    return document.getElementById('name').value

}

function clearForm() {
    document.getElementById('name').value = '';
}

function showNewProjectFormButton() {
    document.getElementById('show-projects-form').addEventListener('click', function(){showNewProjectForm()})
}

function cancelNewProjectFormButton() {
    document.getElementById('cancel-form').addEventListener('click', function(){hideNewProjectForm()});
}

function inbox() {
    document.getElementById('Inbox').addEventListener('click', function(){
        removeContent();
        showInbox();
    })
}

function today() {
    document.getElementById('Today').addEventListener('click', function(){
        removeContent();
        showToday();
    })
}

function upcoming() {
    document.getElementById('Upcoming').addEventListener('click', function(){
        removeContent();
        showUpcoming();
    })
}

function navbarLinks() {
   inbox();
   today();
   upcoming();
}

function projectLinks(){
    Array.from(document.getElementsByClassName('navbar-project')).forEach( button => button.addEventListener('click', function(){
        removeContent();
        showProject(button.id);
    }))
}

function buttons() {
    window.addEventListener('load', function(){    
        createNewProjectButton();
        showNewProjectFormButton();
        cancelNewProjectFormButton();
        navbarLinks();
        projectLinks();
        
    })
}


export {
    buttons
}