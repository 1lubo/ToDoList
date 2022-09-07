import { addElement } from "./buildingblocks";
import { newTaskForm, hideNewTaskFormButton, closeExpandedTaskButton, priorityDropDownButton, deleteTaskButton } from "./formsAndButtons";
import { allTasks } from "./storage";
import { buildExpandedTask } from "./displayTask"

function newTaskModal(){
    let modal = addElement('div');
    modal.classList.add('modal');
    modal.id = 'myModal';        
    modal.appendChild(newTaskForm());
    
    return modal;
}

function showTaskModal(taskTitle){
    let modal = addElement('div');
    modal.classList.add('modal');
    modal.id = 'myModal';
    let modalForm = addElement('div');
    modalForm.classList.add('modal-form')
    let modalContent = addElement('div');
    modalContent.classList.add('modal-content');        
    let task = allTasks().find(e => e.title == taskTitle); 
       
    buildExpandedTask(task).forEach( e => modalForm.appendChild(e));      
    let submitFormButton = addElement('button', 'Save');
    submitFormButton.id = 'close-expanded-task';    
    let cancelFormButton = addElement('button', 'Cancel');    
    cancelFormButton.id = 'cancel-task-form';
    let deleteTask = addElement('button', 'Delete');
    deleteTask.id = 'delete-task';
    let formButtons = addElement('div');
    formButtons.appendChild(submitFormButton);
    formButtons.appendChild(cancelFormButton);
    formButtons.appendChild(deleteTask);
    modalForm.appendChild(formButtons);
    modalContent.appendChild(modalForm);
    modal.appendChild(modalContent);
    
    let root = document.getElementsByClassName('project-tasks')[0];

    root.appendChild(modal);
    hideNewTaskFormButton();
    closeExpandedTaskButton(taskTitle); 
    priorityDropDownButton();
    deleteTaskButton(taskTitle);
}

export {
    newTaskModal, showTaskModal
}