class Task {
    constructor(name, 
                desc = '', 
                project = 'Inbox', 
                dueDate = new Date(new Date().toDateString()), 
                createDate = new Date(new Date().toDateString()), 
                id = Date.now() + Math.random()){
        this.name = name;
        this.desc = desc;
        this.project = project;
        this.dueDate = dueDate;
        this.createDate = createDate;
        this.id = id;
    };

    // createDate = new Date(new Date().toDateString());
    // get dueDate() {
    //     return this.displayDueDate();
    // }

    displayDueDate () {
        let createDateTimeValue = this.createDate.getTime();
        let dueDateTimeValue = this.dueDate.getTime();
        if (createDateTimeValue === dueDateTimeValue) {
            return "Today";
        }
        else {
            return dateFormatter(this.dueDate).formattedDate;
        }
    }

    // createDate = dateFormatter(new Date()).formattedDate;
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

function todoListWriter(array) {
    let taskListContainer = document.getElementById("tasks");

    for (const task of array) {
        let taskContainer = document.createElement("div");
        taskContainer.id = task.id;
        taskContainer.dataset.createDate = task.createDate;

        let taskName = document.createElement("p");
        taskName.id = "name";
        taskName.textContent = task.name;

        let taskDesc = document.createElement("p");
        taskDesc.id = "desc";
        taskDesc.textContent = task.desc;

        let taskProject = document.createElement("p");
        taskProject.id = "project";
        taskProject.textContent = task.project;

        let taskDueDate = document.createElement("p");
        taskDueDate.id = "due-date";
        taskDueDate.textContent = task.displayDueDate();
        
        taskContainer.append(taskName); 
        taskContainer.append(taskDesc);
        taskContainer.append(taskProject);
        taskContainer.append(taskDueDate);

        

        taskListContainer.append(taskContainer);
    }
}

function arrayManager () {
    let array = [];
    
    function filterArray (criteria) {
        pass;
    }

    function sortArray (criteria) {
        pass;
    }
};

function storageManager () {

    function readStorageKeys (storage) {
        const storageKeys = Object.keys(storage);
        return storageKeys;
    }

    function initialWriteToStorage () {
        pass;
    }

    function appendToStorage (task) {
        pass;
    };

    function deleteFromStorage (id) {
        pass;
    }
}

function storedDataConverter (key) {
    
    
    let task = new Task();
}

function taskDataConverter (id) {
    let taskHTML = document.getElementById(id);
    let dict = {};
    // Sort through the attributes and ID's to automatically populate the dictionary
    
    dict.name = taskHTML.querySelector(`#name`).textContent;
    dict.desc = taskHTML.querySelector(`#desc`).textContent;
    dict.project = taskHTML.querySelector(`#project`).textContent;
    dict.dueDate = taskHTML.querySelector(`#due-date`).textContent;

    return { dict }
}

newTask = new Task("Make bed","","", new Date(2025, 2, 15));
console.log(newTask.name);
// console.log(newTask.createDate)
console.log(newTask.displayDueDate());

taskArray = [newTask];

todoListWriter(taskArray);

// dateOld = new Date(2025, 8, 15);
// dateNew = new Date(2025, 8, 17);

// console.log(dateOld)
// console.log(dateNew - dateOld);

