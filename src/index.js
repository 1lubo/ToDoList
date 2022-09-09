import { createNavBar } from "./navbar";
import { saveObject } from "./storage";
import { createProject } from "./project";
import { Task } from "./task";
import { buttons } from "./formsAndButtons";
import { showInbox } from "./displayTask";
import { taskLinks } from "./formsAndButtons";
import './style.css';
import { showProject } from "./displayProject";

const {addDays,format, differenceInCalendarDays, isSameYear, parseISO, parseJSON} = require('date-fns');


localStorage.clear();

function random_item(items)
{
  
return items[Math.floor(Math.random()*items.length)];
     
}


var proj1 = createProject('Inbox');
//proj.getTasks();
//saveObject(proj)
//proj1.getTasks();
saveObject(proj1)
var projects = [];

for (let i = 1; i < 4; i++) {
    let proj = createProject(`Project - ${i}`)
    saveObject(proj);
    projects.push(proj.title);
}


let completeness = [true, false];
let descriptions = ['Interesting', 'Long long long very very long description', null]


for (let i = 1; i < 11; i++){    
    var task = new Task(`${String.fromCharCode(97 + i)}task`, random_item(projects) , addDays(new Date(),Math.floor(Math.random() * 10)), Math.floor(Math.random() * (4 - 1) + 1), random_item(completeness), random_item(descriptions));
    saveObject(task);
}




createNavBar();

showProject('Inbox')
taskLinks()

buttons()