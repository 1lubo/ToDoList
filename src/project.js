
function Project (title) {
    this.type = 'project';
    this.title = title;
    this.tasks = [];
}

Project.prototype.getTasks = function () {    
    var project = this;
    Object.keys(localStorage).forEach(function(key){
        if(localStorage.getItem(key).includes(`"type":"task"`) && 
        localStorage.getItem(key).includes(`"project":"${project.title}"`)
        ) {
            project.tasks.push(localStorage.getItem(key));
        }

     });
}

export {Project}