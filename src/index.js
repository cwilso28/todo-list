class Task {
    constructor(name, desc = '', project = 'Inbox', dueDate = new Date()) {
        this.name = name;
        this.desc = desc;
        this.project = project;
        this.dueDate = dueDate;
    };

    createDate = dateFormatter(new Date()).formattedDate;
}

function dateFormatter(date) {
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat("en-US", options)

    let formattedDate = formatter.format(date);

    return { formattedDate }
}

newTask = new Task("Make bed","","",'Today');
console.log(newTask.name);
console.log(newTask.createDate)

