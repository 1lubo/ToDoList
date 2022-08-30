import { createNavBar } from "./navbar";
import { saveObject } from "./storage";
import { Project } from "./project";
import { Task } from "./task";
import { buildTask } from "./displayTask";
import { buildProject } from "./displayProject";
import './style.css';


//window.addEventListener('onload', alert(checkStorageAvailable()));
createNavBar();

var proj = new Project('default');

saveObject(proj);



for (let i = 1; i < 11; i++){    
    var task = new Task(`task${i}`, 'default', addDays(new Date(),Math.floor(Math.random() * 10)), Math.floor(Math.random() * (4 - 1) + 1));
    saveObject(task);
}



//var loadTask = findObject('default', 'project');


var content = document.createElement('div');
content.classList.add('content');
//content.appendChild(buildProject(loadTask));
Object.keys(localStorage).forEach(function(key){
    if(localStorage.getItem(key).includes(`"type":"task"`)){
        content.appendChild(buildTask(localStorage.getItem(key)))
    }
})


document.body.appendChild(content);


