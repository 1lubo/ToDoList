import { Project,validateName, createProject } from "./project";
import { addProjectToNavbar, showProject, removeProjectFromNavbar } from "./displayProject";
import { addElement, removeContent } from "./buildingblocks";
import { showInbox, showToday, showUpcoming, addNewTaskToContainer, showTask, 
buildTaskAfterEdit, buildTaskPriorityDropdown, removeTaskContainer, buildTaskProjectDropdown } from "./displayTask";
import { validateTaskName, createTask } from "./task";
import { newTaskModal, showTaskModal } from "./modal";
import { createObject, saveObject, findObject, deleteObject, deleteProjectTasks } from "./storage";
import { createNavBar } from "./navbar";

function newTaskForm(){
    let formElements = [];
    let modalContent = addElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(addElement('h1', 'Add Task'))
    let formContainer = addElement('div');
    formContainer.classList.add('modal-form');    
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
    //formElements.push(dueDate);
    let priority = buildTaskPriorityDropdown();
    priority.id = 'task-priority'
    let dateAndPriority = addElement('div');
    dateAndPriority.classList.add('datepriority-container');
    let projectPriorityContainer = addElement('div');
    projectPriorityContainer.classList.add('project-priority')
    dateAndPriority.appendChild(dueDate);
    projectPriorityContainer.appendChild(buildTaskProjectDropdown('Inbox'));
    projectPriorityContainer.appendChild(priority)
    dateAndPriority.appendChild(projectPriorityContainer);    
    
    let formButtons = addElement('div');
    formButtons.classList.add('modal-form-buttons');
    let submitFormButton = addElement('button', 'Add Task');
    submitFormButton.id = 'add-task';    
    let cancelFormButton = addElement('button', 'Cancel');    
    cancelFormButton.id = 'cancel-task-form';
    formButtons.appendChild(submitFormButton);
    formButtons.appendChild(cancelFormButton);    
    formElements.forEach( e => formContainer.appendChild(e));
    formContainer.appendChild(dateAndPriority);
    formContainer.appendChild(formButtons);
    modalContent.appendChild(formContainer)

    return modalContent;

}

function taskLinks(){
    Array.from(document.getElementsByClassName('task-details-container')).forEach( task => task.addEventListener('click', function (){                
        showTaskModal(task.id);
        
    }))
}



function completeTaskButtons(){
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach( input => input.addEventListener('click', () => {
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
    if(task)    {
        task.completed = false;
        saveObject(task);
        let taskHeader = document.getElementById(taskTitle).children[0].firstChild
        taskHeader.classList.remove('completed');
    }
    
    
}

function completeTask(taskTitle){
    
    let task = createObject(findObject(taskTitle, 'task'));
    localStorage.removeItem(taskTitle); 
    if(task)   {
        task.completed = true;
        saveObject(task);
        let taskHeader = document.getElementById(taskTitle).children[0].firstChild
        taskHeader.classList.add('completed')
}
}
    

function getTaskTitleFromForm() {
    return document.getElementById('task-title').value
}

function getTaskDescriptionFromForm() {
    return document.getElementById('task-description').value
}

function getTaskDueDateFromForm() {
    let dueDate = document.getElementById('task-dueDate').innerHTML;
    dueDate ||= new Date();
    return dueDate
}

function getTaskPriority() {
    let priorityNumber = '';
    let newPriority = ''
    if (document.getElementsByClassName('dropbtn')[0].classList.length < 5) {
        newPriority = document.getElementsByClassName('dropbtn')[0].classList[3];
        switch (newPriority) {
            case 'red':
                priorityNumber = '1'
                break;
            case 'yellow':
                priorityNumber = '2'
                break;
            case 'green':
                priorityNumber = '3'
                break;
            default:
                priorityNumber = '4'
        }
        return priorityNumber
    } 
    newPriority =  document.getElementsByClassName('dropbtn')[0].classList[4];

    switch (newPriority) {
        case 'red':
            priorityNumber = '1'
            break;
        case 'yellow':
            priorityNumber = '2'
            break;
        case 'green':
            priorityNumber = '3'
            break;
        default:
            priorityNumber = '4'
    }
    return priorityNumber

}

function getProjectName() {
    //let projectName = document.getElementsByClassName('project-title')[0];
    //if (document.body.contains(projectName)) {
    //    return projectName.innerText
    //} else {
    //    return 'Inbox';
    //}
    return document.getElementsByClassName('dropbtn-projects')[0].innerHTML;
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
    projectDropdownButton();

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
            if(newTask.project == document.getElementsByClassName('project-title')[0].innerHTML){
                addNewTaskToContainer(newTask);           
                clearTaskForm();
                hideNewTaskForm();
            } else {
                removeContent();
                showProject(newTask.project);
                taskLinks(); 
            }
            
        } else {
            alert(validateTaskName(getTaskTitleFromForm(), getProjectName()));
        }
    })
}

function closeExpandedTask(taskTitle) {
    let previousProject = createObject(findObject(taskTitle, 'task')).project
    localStorage.removeItem(taskTitle);    
    let taskContainer = document.getElementById(taskTitle)
    let originalTaskComplete = taskContainer.children[0].children[0].classList.contains('completed');
    let newTask = createTask(getTaskTitleFromForm(), getProjectName(), getTaskDueDateFromForm(), getTaskPriority(), originalTaskComplete, getTaskDescriptionFromForm());
    saveObject(newTask);
    let previousPriority = taskContainer.classList[1];
    let taskCheckbox = taskContainer.previousElementSibling;
    taskContainer.classList.remove(previousPriority);
    taskCheckbox.classList.remove(previousPriority);
    taskContainer.classList.add(`priority-${getTaskPriority()}`)
    taskCheckbox.classList.add(`priority-${getTaskPriority()}`);
    taskContainer.id = getTaskTitleFromForm();
    taskContainer.textContent = '';    
    //if(previousProject == newTask.project){
    //    buildTaskAfterEdit(newTask).forEach(e => taskContainer.appendChild(e))
    //    hideNewTaskForm();
    //} else {
    //    removeContent();
    //    showProject(newTask.project);
    //    taskLinks();
    //}
    removeContent();
    showProject(newTask.project);
    taskLinks();
       
    
}

function closeExpandedTaskButton(taskTitle){
    document.getElementById('close-expanded-task').addEventListener('click', function(){closeExpandedTask(taskTitle)})
}

function deleteTaskButton(taskTitle){

    document.getElementById('delete-task').addEventListener('click', ()=> {
        hideNewTaskForm();
        removeTaskContainer(taskTitle);
    })
    
}

function closeDropdown(priority){    
    let previousPriority =  document.getElementsByClassName('dropbtn')[0].classList[3];    
    document.getElementsByClassName('dropbtn')[0].classList.remove('hide', previousPriority);
    document.getElementsByClassName('dropbtn')[0].classList.add('show', priority);
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
    let selection = event.target.id; 
    
    let text = '';    
    switch (parseInt(selection)){
        case 1:
            text = 'red'
            break;
        case 2:
            text = 'yellow'
            break;
        case 3:
            text = 'green'
            break;
        default:
            text = 'gray'
    }
    
        closeDropdown(text);
    }));
    
    
}

function priorityDropDownButton() {
    document.getElementsByClassName('dropbtn')[0].addEventListener('click', function(){
        taskPrioritySettingButton();        
        showDropDown();
    });
}

function taskProjectSettingButton() {
    Array.from(document.querySelector('.projects-dropdown-content').childNodes).forEach( button => button.addEventListener('click', (e)=> {
        closeProjectDropDown(e.target.firstChild.data);
    }))
}

function projectDropdownButton() {
    document.getElementsByClassName('dropbtn-projects')[0].addEventListener('click', () => {
        taskProjectSettingButton();
        showProjectDropDown();
    })
}

function showProjectDropDown() {
    document.getElementsByClassName('dropbtn-projects')[0].classList.remove('show');
    document.getElementsByClassName('dropbtn-projects')[0].classList.add('hide');
    document.getElementsByClassName('projects-dropdown-content')[0].classList.remove('hide');
    document.getElementsByClassName('projects-dropdown-content')[0].classList.add('show');
}

function closeProjectDropDown(newProject) {
    document.getElementsByClassName('dropbtn-projects')[0].innerHTML = newProject;
    document.getElementsByClassName('dropbtn-projects')[0].classList.replace('hide', 'show')
    document.getElementsByClassName('projects-dropdown-content')[0].classList.replace('show', 'hide')    
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
    let projectTitle =  document.getElementById('name').value;    
    return projectTitle.replace(/\s+/g, "")

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


function deleteProjectButton(){
    document.getElementById('delete-project').addEventListener('click', (e)=> {
        let projectTitle = e.target.previousElementSibling.innerHTML
        removeProjectFromNavbar(projectTitle);
        deleteProjectTasks(projectTitle);
        deleteObject(projectTitle, 'project')
        removeContent();        
        showProject('Inbox')        
        taskLinks();
        completeTaskButtons();        
    })
}

function projectFilterButton(){
    document.getElementsByClassName('dropbtn-filter')[0].addEventListener('click', ()=> {
        showTasksFilterDropdown()
        //document.getElementsByClassName('dropbtn-filter')[0].classList.add('open')
        //if (document.body.contains(document.querySelector('.dropbtn-filter .open'))) {
        //    cancelTaskFilterDropdownButton()
        //}
        
    })
}

function showTasksFilterDropdown(){
    if(document.getElementsByClassName('filter-dropdown-content')[0].classList.contains('hide')){
        document.getElementsByClassName('filter-dropdown-content')[0].classList.replace('hide', 'show');   
    } else {
        document.getElementsByClassName('filter-dropdown-content')[0].classList.add('show');
    }
    taskProjectFilterButton() 
}

function closeTaskFilterDropDown(filterName){    
    document.getElementsByClassName('filter-dropdown-content')[0].classList.replace('show', 'hide');
    document.getElementsByClassName('dropbtn-filter')[0].classList.remove('open')
    let projectTitle = document.getElementsByClassName('project-title')[0].children[2].innerHTML;    
    removeContent();     
    showProject(projectTitle, filterName)
      
    taskLinks();
    completeTaskButtons();
}

function taskProjectFilterButton() {
    Array.from(document.querySelector('.filter-dropdown-content').childNodes).forEach( button => button.addEventListener('click', (e)=> {        
        closeTaskFilterDropDown(e.target.innerHTML);        
    }))
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
            button.innerHTML = 'close';
        } else {
            hideMenu();
            button.classList.replace('menu-shown','menu-hidden')
            button.innerHTML = 'menu_open';
        }
    })
    
}

var eventHandler = function(e){e.preventDefault(); editDate(this);};


function editDate(div){
    let currentDate = div.innerText;
    let datePicker = document.createElement('INPUT');
    datePicker.setAttribute('type','date');    
    datePicker.value = currentDate;

    div.innerHTML = "";
    div.append(datePicker);
    datePicker.focus();
    datePicker.addEventListener('focusout', function(e){
        finishEditDate(div);
    });

    div.removeEventListener('click', eventHandler);
 }

 function finishEditDate(div){    

    let newDate = div.querySelector('input').value;
    div.innerText = newDate;
    document.querySelector('.editable').addEventListener('click', eventHandler);
 }

 var showCompletedEventHandler = function(e){e.preventDefault(); showCompleted(this);};
 var hideCompletedEventHandler = function(e){e.preventDefault(); hideCompleted(this);};

 function showCompleted(span){
    span.id = 'hide-completed';
    span.innerHTML = 'visibility_off';
    document.querySelector('.project-tasks.completed').classList.replace('hide', 'show');
    span.removeEventListener('click', showCompletedEventHandler)
    span.addEventListener('click', hideCompletedEventHandler)
   }
 

 function hideCompleted(span) {
    span.id = 'show-completed';
    span.innerHTML = 'visibility';
    document.querySelector('.project-tasks.completed').classList.replace('show', 'hide');
    span.removeEventListener('click', hideCompletedEventHandler)
    span.addEventListener('click', showCompletedEventHandler)
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

function start() {
    saveObject(createProject('Inbox'));    
    createTask('Welcome to ...', 'Inbox', null, 1, false, 'Forget-Me-Not');
    createTask('Add a task ...', 'Inbox', null, 2, false, 'by clicking on the button in the lower right-hand corner');
    createTask('Add a project ...', 'Inbox', null, 3, false, 'by clicking on the plus symbol on the navigation bar');
    createNavBar();
    showProject('Inbox','Priority');
    taskLinks();
    buttons();
}


export {
    buttons, closeExpandedTaskButton, closeExpandedTask, newTaskForm, hideNewTaskFormButton, createNewTaskButton, taskLinks, 
    priorityDropDownButton, completeTask, uncompleteTask, deleteTaskButton, deleteProjectButton, projectDropdownButton, projectFilterButton,
    eventHandler, showCompletedEventHandler, hideCompletedEventHandler, start
}