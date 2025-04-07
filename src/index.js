class Task {
    constructor( {name, 
                desc = '', 
                project = 'Inbox',
                priority = 1, 
                dueDate = newDateWithoutTime(), 
                createDate = newDateWithoutTime(), 
                id = Date.now() + Math.random()} ){
        this.name = name;
        this.desc = desc;
        this.project = project;
        this.priority = priority;
        this.dueDate = new Date(dueDate);
        this.createDate = new Date(createDate);
        this.id = id;
    };

    formatDateForDisplay () {
        let createDateTimeValue = this.createDate.getTime();
        let dueDateTimeValue = this.dueDate.getTime();
        if (createDateTimeValue === dueDateTimeValue) {
            return "Today";
        }
        else {
            return dateFormatter(this.dueDate).formattedDate;
        }
    }

    asHTML () {
        let taskContainer = document.createElement("div");
        taskContainer.id = this.id;

        let namePara = document.createElement("p");
        namePara.textContent = this.name;

        let descPara = document.createElement("p");
        descPara.textContent = this.desc;

        let projectPara = document.createElement("p");
        projectPara.textContent = this.project;
        
        let priorityPara = document.createElement("p");
        priorityPara.textContent = this.priority;

        let dueDatePara = document.createElement("p");
        dueDatePara.textContent = this.formatDateForDisplay();

        taskContainer.append(namePara);
        taskContainer.append(descPara);
        taskContainer.append(projectPara);
        taskContainer.append(priorityPara);
        taskContainer.append(dueDatePara);

        return taskContainer;
    }

    asDictionary () {
        let dict = {};
        for (let [key, value] of Object.entries(this)) {
            dict[key] = value;
        };
        return dict;
    }
}

function newDateWithoutTime () {
    return new Date(new Date().toDateString())
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


class User {
    constructor () {};
    request(manager) {
        manager.process_request(self);
    }
}

class taskManager {
    constructor () {};
    process_request (event) {
        pass;
    }

    createTask () {
        // Gather inputs from the HTML page
        // Format inputs into a format compatible with storage
        // Submit a task addition to the storage manager
    }

    storageRequest (manager) {
        manager.process_request(self);
    }


}

class taskListManager {
    pass;
}

class projectManager {
    pass;
}

class displayManager {
    constructor () {};

    createForm () {
        let popup = document.createElement("div")
        popup.id = "popup";
    }
    pass;
}

function storageManager () {

    function readStorageKeys (storage) {
        const storageKeys = Object.keys(storage);
        return storageKeys;
    }

    function initialWriteToStorage () {
        pass;
    }

    function getFromStorage(id) {
        let task = localStorage.getItem(id);
        return task
    }

    function appendToStorage (task) {
        localStorage.setItem(task.id, JSON.stringify(task.asDictionary()));
    };

    function deleteFromStorage (id) {
        pass;
    }

    return { readStorageKeys, initialWriteToStorage, appendToStorage, deleteFromStorage, getFromStorage }
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

localStorage.clear();

let taskContainer = document.getElementById("tasks");
newTask = new Task({ name: "Make bed", dueDate: new Date(2025, 2, 15) });
taskContainer.append(newTask.asHTML())
console.log(newTask.asHTML());
console.log(newTask.createDate);
console.log(newTask.asDictionary());
let storageManagerInstance = new storageManager;
storageManagerInstance.appendToStorage(newTask);

console.log(storageManagerInstance.getFromStorage(newTask.id))
let repeatTask = storageManagerInstance.getFromStorage(newTask.id);
newTask2 = new Task(repeatTask);
taskContainer.append(newTask2.asHTML());
console.log(newTask2.asDictionary());

let repeatTaskParsed = JSON.parse(storageManagerInstance.getFromStorage(newTask.id));
console.log(repeatTaskParsed);
newTask3 = new Task(repeatTaskParsed);
console.log(newTask3.asHTML());
taskContainer.append(newTask3.asHTML())
// taskContainer.append(newTask3.asHTML());
// console.log(newTask.createDate)
// console.log(newTask.displayDueDate());

// taskArray = [newTask];

// todoListWriter(taskArray);

// dateOld = new Date(2025, 8, 15);
// dateNew = new Date(2025, 8, 17);

// console.log(dateOld)
// console.log(dateNew - dateOld);

