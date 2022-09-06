import { addElement } from "./buildingblocks";
import { newTaskForm, hideNewTaskFormButton, closeExpandedTaskButton, priorityDropDownButton } from "./formsAndButtons";
import { allTasks } from "./storage";
import { buildExpandedTask } from "./displayTask"

function newTaskModal(){
    let modal = addElement('div');
    modal.classList.add('modal');
    modal.id = 'myModal';
    let modalContent = addElement('div');
    modalContent.classList.add('modal-content');
    modalContent.appendChild(newTaskForm());
    modal.appendChild(modalContent);
    
    return modal;
}

function showTaskModal(taskTitle){
    let modal = addElement('div');
    modal.classList.add('modal');
    modal.id = 'myModal';
    let modalContent = addElement('div');
    modalContent.classList.add('modal-content');        
    let task = allTasks().find(e => e.title == taskTitle); 
       
    buildExpandedTask(task).forEach( e => modalContent.appendChild(e));      
    let submitFormButton = addElement('button', 'Save');
    submitFormButton.id = 'close-expanded-task';
    modalContent.appendChild(submitFormButton);
    let cancelFormButton = addElement('button', 'Cancel');    
    cancelFormButton.id = 'cancel-task-form';
    modalContent.appendChild(cancelFormButton);

    modal.appendChild(modalContent);
    
    let root = document.getElementsByClassName('project-tasks')[0];

    root.appendChild(modal);
    hideNewTaskFormButton();
    closeExpandedTaskButton(taskTitle); 
    priorityDropDownButton();
}

export {
    newTaskModal, showTaskModal
}