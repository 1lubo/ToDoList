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
        console.log(`${object.type} with the name ${object.title} was successfully saved!`);
    }

    function createObject(string) {
        var obj = JSON.parse(string);
        var title = obj.title;
        var type = obj.type;

        if(type == 'project') {            
            return new Project(title);
        } else if (type == 'task') {
            return new Task(title, obj.project, obj.dueDate, obj.priority, obj.completed);
        }
    }

    function findObject(title, type){
                
        if (window.localStorage.getItem(title) == null){
            return false;
        }

        var foundInStorage = window.localStorage.getItem(title);

        if (foundInStorage.includes(title) && foundInStorage.includes(type)) {
            return foundInStorage;
        } else {
            return false;
        }
        
    }
  

export {
    storageAvailable, checkStorageAvailable, saveObject, findObject, createObject
}