
function Task (title, project= null, dueDate = null, priority = 1, completed = false) {
    this.type = 'task';
    this.project = project;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
}

export {Task}