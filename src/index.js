class Task {
    constructor(name, desc = '', project = 'Inbox', dueDate = 'Today') {
        this.name = name;
        this.desc = desc;
        this.project = project;
        this.dueDate = dueDate;
    };

    createDate = new Date();
}