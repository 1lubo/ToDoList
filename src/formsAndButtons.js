import { Project,validateName, createProject } from "./project";
import { addProjectToNavbar, showProject } from "./displayProject";
import { addElement, removeContent } from "./buildingblocks";
import { showInbox, showToday, showUpcoming, addNewTaskToContainer, showTask, 
buildTaskAfterEdit, buildTaskPriorityDropdown } from "./displayTask";
import { validateTaskName, createTask } from "./task";
import { newTaskModal, showTaskModal } from "./modal";
import { createObject, saveObject, findObject } from "./storage";

function newTaskForm(){
    let formElements = [];
    let formContainer = addElement('div');
    formContainer.classList.add('expanded-form-container');    
    let title = addElement('input');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Title');
    title.id = 'task-title';
    formElements.push(title);
    let description = addElement('input');
    description.setAttribute('type', 'text');
    description.setAttribute('placeholder', 'Description');
    description.id = 'task-description';
    formElements.push(description);
    let dueDate = addElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.id = 'task-dueDate';
    formElements.push(dueDate);
    let priority = buildTaskPriorityDropdown();
    priority.id = 'task-priority'
    formElements.push(priority);
    let submitFormButton = addElement('button', 'Add Task');
    submitFormButton.id = 'add-task';
    formElements.push(submitFormButton);
    let cancelFormButton = addElement('button', 'Cancel');    
    cancelFormButton.id = 'cancel-task-form';
    formElements.push(cancelFormButton);
    formElements.forEach( e => formContainer.appendChild(e));

    return formContainer;

}

function taskLinks(){
    Array.from(document.getElementsByClassName('task-details-container')).forEach( task => task.addEventListener('click', function(){                
        showTaskModal(task.id);
        
    }))
}

function completeTaskButtons(){
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach( input => input.addEventListener('click', (e) => {
        let taskTitle = input.nextElementSibling.id;
        
        if(input.checked){            
            completeTask(taskTitle);            
            
        } else {  
            uncompleteTask(taskTitle);
        }
    }))
    
}

function uncompleteTask(taskTitle){
    
    let task = createObject(findObject(taskTitle, 'task'));
    localStorage.removeItem(taskTitle); 
    task.completed = false;
    saveObject(task);
    let taskHeader = document.getElementById(taskTitle).children[0].firstChild
    taskHeader.classList.remove('completed');
}

function completeTask(taskTitle){
    
    let task = createObject(findObject(taskTitle, 'task'));
    localStorage.removeItem(taskTitle); 
    task.completed = true;
    saveObject(task);
    let taskHeader = document.getElementById(taskTitle).children[0].firstChild
    taskHeader.classList.add('completed')
}

function getTaskTitleFromForm() {
    return document.getElementById('task-title').value
}

function getTaskDescriptionFromForm() {
    return document.getElementById('task-description').value
}

function getTaskDueDateFromForm() {
    let dueDate = document.getElementById('task-dueDate').value;
    dueDate ||= new Date();
    return dueDate
}

function getTaskPriority() {
    
    if (document.getElementsByClassName('dropbtn')[0].classList.length < 3) {
        return document.getElementsByClassName('dropbtn')[0].classList[1].slice(-1);
    } 
    return document.getElementsByClassName('dropbtn')[0].classList[2].slice(-1);
}

function getProjectName() {
    let projectName = document.getElementsByClassName('project-title')[0];
    if (document.body.contains(projectName)) {
        return projectName.innerText
    } else {
        return 'Inbox';
    }
    
}


function clearTaskForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-dueDate').value = '';
}

function showNewTaskForm(){
    let root = document.getElementsByClassName('project-tasks')[0];

    root.appendChild(newTaskModal())
    priorityDropDownButton();
    hideNewTaskFormButton();
    createNewTaskButton(); 

}

function hideNewTaskForm(){    
    let form = document.getElementById('myModal');
    form.remove();
}


function showNewTaskFormButton(){
    document.getElementById('new-task').addEventListener('click', function(){showNewTaskForm()})    
    
}

function hideNewTaskFormButton(){
    document.getElementById('cancel-task-form').addEventListener('click', function(){hideNewTaskForm()})
}

function createNewTaskButton() {
    document.getElementById('add-task').addEventListener('click', function(){
        if(validateTaskName(getTaskTitleFromForm(), getProjectName() ) === true) {            
            let newTask = createTask(getTaskTitleFromForm(), getProjectName(), getTaskDueDateFromForm(), getTaskPriority(), false, getTaskDescriptionFromForm());
            addNewTaskToContainer(newTask);
            clearTaskForm();
            hideNewTaskForm();
        } else {
            alert(validateTaskName(getTaskTitleFromForm(), getProjectName()));
        }
    })
}

function closeExpandedTask(taskTitle) {
    localStorage.removeItem(taskTitle);    
    let newTask = createTask(getTaskTitleFromForm(), getProjectName(), getTaskDueDateFromForm(), getTaskPriority(), false, getTaskDescriptionFromForm());
    let taskContainer = document.getElementById(taskTitle)
    let previousPriority = taskContainer.classList[1];
    let taskCheckbox = taskContainer.previousElementSibling;
    taskContainer.classList.remove(previousPriority);
    taskCheckbox.classList.remove(previousPriority);
    taskContainer.classList.add(`priority-${getTaskPriority()}`)
    taskCheckbox.classList.add(`priority-${getTaskPriority()}`);
    taskContainer.id = getTaskTitleFromForm();
    taskContainer.textContent = '';
    buildTaskAfterEdit(newTask).forEach(e => taskContainer.appendChild(e))
    hideNewTaskForm();
    
}

function closeExpandedTaskButton(taskTitle){
    document.getElementById('close-expanded-task').addEventListener('click', function(){closeExpandedTask(taskTitle)})
}


function closeDropdown(priority){    
    let previousPriority =  document.getElementsByClassName('dropbtn')[0].classList[1];
    document.getElementsByClassName('dropbtn')[0].classList.remove('hide', previousPriority);
    document.getElementsByClassName('dropbtn')[0].classList.add('show', `priority-${priority}`);
    document.getElementsByClassName('dropdown-content')[0].classList.remove('show')
    document.getElementsByClassName('dropdown-content')[0].classList.add('hide');
}

function showDropDown(){
    document.getElementsByClassName('dropbtn')[0].classList.remove('show');
    document.getElementsByClassName('dropbtn')[0].classList.add('hide');
    document.getElementsByClassName('dropdown-content')[0].classList.remove('hide');
    document.getElementsByClassName('dropdown-content')[0].classList.add('show');
}

function taskPrioritySettingButton() {
    Array.from(document.querySelector('.dropdown-content').childNodes).forEach(button => button.addEventListener('click', event =>{        
        closeDropdown(event.target.id);
    }));
    
    
}

function priorityDropDownButton() {
    document.getElementsByClassName('dropbtn')[0].addEventListener('click', function(){
        taskPrioritySettingButton();        
        showDropDown();
    });
}

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
            projectLinks();
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
    document.getElementById('Inbox').parentElement.addEventListener('click', function(){
        removeContent();        
        showProject('Inbox')
        taskLinks();
        completeTaskButtons();
    })
}

function today() {
    document.getElementById('Today').parentElement.addEventListener('click', function(){
        removeContent();
        showToday();
        taskLinks();
        completeTaskButtons();
    })
}

function upcoming() {
    document.getElementById('Upcoming').parentElement.addEventListener('click', function(){
        removeContent();
        showUpcoming();
        taskLinks();
        completeTaskButtons();
    })
}


function showMenu() {
    document.getElementsByClassName('navbar')[0].classList.replace('hide-on-mobile','show-on-mobile')
}

function hideMenu() {
    document.getElementsByClassName('navbar')[0].classList.replace('show-on-mobile','hide-on-mobile')
}

function showMenuButton() {
    let button = document.getElementById('responsive-menu');
    let classList = button.classList
    button.addEventListener('click', ()=> {
        if (classList.contains('menu-hidden')) {
            showMenu();
            button.classList.replace('menu-hidden', 'menu-shown')
            button.innerHTML = `\u{2716}`
        } else {
            hideMenu();
            button.classList.replace('menu-shown','menu-hidden')
            button.innerHTML = `\u{2630}`
        }
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
        taskLinks();
    }))
}

function buttons() {
    window.addEventListener('load', function(){    
        createNewProjectButton();
        showNewProjectFormButton();
        cancelNewProjectFormButton();
        navbarLinks();
        projectLinks();
        showNewTaskFormButton();
        completeTaskButtons();
        showMenuButton();
        
    })
}


export {
    buttons, closeExpandedTaskButton, closeExpandedTask, newTaskForm, hideNewTaskFormButton, createNewTaskButton, taskLinks, priorityDropDownButton
}