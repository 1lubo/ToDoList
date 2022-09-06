import { Project } from "./project";
import { Task } from "./task";

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function checkStorageAvailable() {
    if (storageAvailable('localStorage')) {        
        return 'Local Storage Available. Saved data will be available even after the browser is closed.';
      }
      else {        
        return 'Local Storage Not Available. Saved Data will be deleted after the browser is closed.';
      }
}

    function saveObject(object){        
        window.localStorage.setItem(object.title, JSON.stringify(object));        
    }

    function createObject(string) {
        let obj = JSON.parse(string);
        let title = obj.title;
        let type = obj.type;

        if(type == 'project') {            
            return new Project(title);
        } else if (type == 'task') {
            return new Task(title, obj.project, obj.dueDate, obj.priority, obj.completed, obj.description);
        }
    }

    function findObject(title, type){
                
        if (window.localStorage.getItem(title) == null){
            return false;
        }

        let foundInStorage = window.localStorage.getItem(title);

        if (foundInStorage.includes(title) && foundInStorage.includes(type)) {
            return foundInStorage;
        } else {
            return false;
        }
        
    }

    function archiveObject(title, type) {
        let object = findObject(title, type);

        if (object) {
            object = createObject(object);
        }
        object.completed = true;
        saveObject(object);
    }

    function allTasks () {
        let allTasks = [];
        Object.keys(localStorage).forEach(function(key){
            let object = createObject(localStorage.getItem(key));

            if (object.type == 'task') {                
                allTasks.push(object);
            }
          
        })

        
        //allTasks.sort((a, b) => a.title.localeCompare(b.title));
        allTasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        return allTasks
    }

    function allProjects () {
        let allProjects = [];
        Object.keys(localStorage).forEach(function(key){
            if(localStorage.getItem(key).includes(`"type":"project"`)){
                allProjects.push(createObject(localStorage.getItem(key)))
            }
        })

        return allProjects
    }

    function existingProjectNames () {
        
        return allProjects().map( project => project.title);
    }

    function projectTaskNames (projectTitle) {        
        let currentProject = allProjects().find(proj => proj.title = projectTitle);
        currentProject.getTasks();        
        
        return currentProject.tasks.map( task => task.title );
    }

    
  

export {
    storageAvailable, checkStorageAvailable, saveObject, findObject, createObject, allTasks, allProjects, existingProjectNames, projectTaskNames, archiveObject
}