
function Task (title, project= null, dueDate = null, priority = 4, completed = false, description = null,) {
    this.type = 'task';
    this.project = project;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.description = description;

}

export {Task}