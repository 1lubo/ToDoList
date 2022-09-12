import { addElement } from "./buildingblocks";
import { newTaskForm, hideNewTaskFormButton, closeExpandedTaskButton, priorityDropDownButton, deleteTaskButton, projectDropdownButton, eventHandler } from "./formsAndButtons";
import { allTasks } from "./storage";
import { buildExpandedTask } from "./displayTask"
import { add } from "date-fns";


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
    let formHeader = addElement('div');
    formHeader.classList.add('modal-form-header');
    formHeader.appendChild(addElement('h1', 'Edit Task'));
    let submitFormButton = addElement('button', 'Save');
    submitFormButton.id = 'close-expanded-task';    
    let cancelFormButton = addElement('button', 'Cancel');    
    cancelFormButton.id = 'cancel-task-form';   
    let deleteTask = addElement('span', 'delete_forever');    
    deleteTask.id = 'delete-task';
    deleteTask.classList.add('material-icons', 'md-36' ,'red');
    formHeader.appendChild(deleteTask);
    let formButtons = addElement('div');
    formButtons.classList.add('modal-form-buttons')
    formButtons.appendChild(submitFormButton);
    formButtons.appendChild(cancelFormButton);    
    modalForm.appendChild(formButtons);    
    modalContent.appendChild(formHeader);
    modalContent.appendChild(modalForm);
    modal.appendChild(modalContent);
    
    let root = document.getElementsByClassName('project-tasks')[0];

    root.appendChild(modal);
    hideNewTaskFormButton();
    closeExpandedTaskButton(taskTitle); 
    priorityDropDownButton();
    deleteTaskButton(taskTitle);
    projectDropdownButton();    
    document.querySelector('.editable').addEventListener('click', eventHandler)
}

export {
    newTaskModal, showTaskModal
}