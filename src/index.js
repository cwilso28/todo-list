import "./styles.css"
import { format, isAfter } from "date-fns";
import deleteSymbol from "./delete.svg";
import editSymbol from "./pencil.svg";

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
        this.dueDate = formatDate(dueDate);
        this.createDate = formatDate(createDate);
        this.id = id;
    };

    formatDateForDisplay () {
        // if (this.dueDate === this.createDate) {
        if (this.dueDate === formatDate(new Date())) {
            return "Today";
        }
        else {
            return this.dueDate;
        }
    }

    asHTML () {
        let taskContainer = document.createElement("div");
        let taskInfoContainer = document.createElement("div");
        taskInfoContainer.className = "task-info"
        taskContainer.id = this.id;
        taskContainer.className = "task";

        let namePara = document.createElement("p");
        namePara.className = "task-name";
        namePara.textContent = this.name;

        let descPara = document.createElement("p");
        descPara.className = "task-desc";
        descPara.textContent = this.desc;

        let projectPara = document.createElement("p");
        projectPara.className = "task-project";
        projectPara.textContent = "Project: " + this.project;
        
        let priorityPara = document.createElement("p");
        priorityPara.className = "task-priority";
        priorityPara.textContent = "Priority: " + this.priority;

        let dueDatePara = document.createElement("p");
        dueDatePara.className = "task-duedate";
        dueDatePara.textContent = "Due: " + this.formatDateForDisplay();
        if (this.passedDueDate()) {
            dueDatePara.style.color = "red";
        }

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        let editButton = document.createElement("button");
        // editButton.textContent = "Edit";
        editButton.className = "task-edit-button";
        // let editButtonImage = document.createElement("img");
        // editButtonImage.src = editSymbol;
        // editButtonImage.alt = "Edit button";
        // editButtonImage.className = "icon";
        // editButton.append(editButtonImage);
        buttonContainer.append(editButton);

        let deleteButton = document.createElement("button");
        // let deleteButtonImage = document.createElement("img");
        // deleteButtonImage.src = deleteSymbol;
        // deleteButtonImage.alt = "Delete button";
        // deleteButtonImage.className = "icon";
        // deleteButton.append(deleteButtonImage);
        // deleteButton.textContent = "Delete";
        deleteButton.id = "task-delete-button";
        buttonContainer.append(deleteButton);

        // taskContainer.append(namePara);
        // taskContainer.append(descPara);
        // taskContainer.append(projectPara);
        // taskContainer.append(priorityPara);
        // taskContainer.append(dueDatePara);
        taskInfoContainer.append(namePara);
        taskInfoContainer.append(descPara);
        taskInfoContainer.append(projectPara);
        taskInfoContainer.append(priorityPara);
        taskInfoContainer.append(dueDatePara);
        // taskContainer.append(editButton);
        // taskContainer.append(deleteButton);
        taskContainer.append(taskInfoContainer);
        taskContainer.append(buttonContainer);

        return taskContainer;
    }

    asDictionary () {
        let dict = {};
        for (let [key, value] of Object.entries(this)) {
            dict[key] = value;
        };
        return dict;
    }

    passedDueDate () {
        let today = newDateWithoutTime();
        let result = isAfter(today, this.dueDate);
        return result;
    }
}

function formatDate(date) {
    return format(date, "MMM dd, yyyy");
}

function newDateWithoutTime () {
    return formatDate(new Date());
}

function formatFormDate(date) {
    return format(date, "yyyy-MM-dd");
}

function getTomorrowDate() {
    let today = new Date();
    let tomorrow = today.setDate(today.getDate() + 1);
    return tomorrow;
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
    };

    storageWrite(task) {
        storageManagerInstance.appendToStorage(task);
    };

    deleteFromStorage(key) {
        storageManagerInstance.deleteFromStorage(key);
    }

}

class taskListManager {
    constructor () {};
    taskList = [];

    loadFromStorage () {
        this.clearTaskList();

        if (localStorage.length > 0) {
            

            let storedTasks = storageManagerInstance.getAllFromStorage();
            let taskKeys = Object.keys(storedTasks);
            taskKeys.sort();

            for (let i = 0; i < taskKeys.length; i++) {
                let key = taskKeys[i];
                let task = storedTasks[key];
                let newTask = new Task(task);
                this.appendToTaskList(newTask);
            }
            // for (let [key, value] of Object.entries(storedTasks)) {
            //     let newTask = new Task(value)
            //     this.appendToTaskList(newTask);
            // }
        }
    }

    clearTaskList () {
        this.taskList = [];
    }

    appendToTaskList (task) {
        this.taskList.push(task);
    }
}

class projectManager {
    pass;
}

class filterManager {
    constructor() {
        // this.initializeProjectList();
    };
    
    
    // Generic filter template that works for date filters and project filters
    createFilterForm () {
        let filterContainer = document.getElementById("filters");
        let filterFormContainer = document.createElement("form");
        filterFormContainer.action = '';
        filterFormContainer.method = 'get';
        filterFormContainer.id = "filter-container";

        let fixedFilterContainer = document.createElement("div");
        fixedFilterContainer.id = "fixed-filter"

        filterFormContainer.append(fixedFilterContainer)

        // let projectFilterContainer = document.createElement("div");
        // projectFilterContainer.id = "project-filter"

        // filterFormContainer.append(projectFilterContainer);

        filterContainer.append(filterFormContainer);
    }

    generalFilterTemplate(name, filterType, checked = false) {
        let filterInput = document.createElement("input")
        filterInput.type = "radio";
        filterInput.id = name;
        filterInput.className = filterType;
        filterInput.value = name;
        filterInput.name = "filter";
        filterInput.checked = checked;

        let filterLabel = document.createElement("label");
        filterLabel.for = name;
        filterLabel.textContent = name;

        return {filterInput, filterLabel}
    }

    fixedFilterTemplate(name, filterType, checked = false) {
        let filterContainer = document.getElementById("filter-container");
        let fixedFilterSectionContainer = document.getElementById("fixed-filter");
        let fixedFilterContainer = document.createElement("div");
        let {filterInput, filterLabel} = this.generalFilterTemplate(name, filterType, checked);

        fixedFilterContainer.append(filterInput);
        fixedFilterContainer.append(filterLabel);
        fixedFilterSectionContainer.append(fixedFilterContainer);
        filterContainer.append(fixedFilterSectionContainer);
    }

    projectFilterTemplate(name) {
        let filterContainer = document.getElementById("filter-container");
        let projectFilterSectionContainer = document.getElementById("project-filter");
        let projectFilterContainer = document.createElement("div");
        projectFilterContainer.id = name;
        let filterType = "project";

        let {filterInput, filterLabel} = this.generalFilterTemplate(name, filterType, false);

        projectFilterContainer.append(filterInput);
        projectFilterContainer.append(filterLabel);

        let projectDeleteButton = document.createElement("button");
        projectDeleteButton.type = "button";
        projectDeleteButton.className = "project-delete-button";
        // projectDeleteButton.textContent = "delete";

        let projectDeleteButtonImage = document.createElement("img");
        projectDeleteButtonImage.src = deleteSymbol;
        projectDeleteButtonImage.alt = "Delete button"
        projectDeleteButtonImage.className = "icon";
        projectDeleteButton.append(projectDeleteButtonImage);
        projectFilterContainer.append(projectDeleteButton);

        projectFilterSectionContainer.append(projectFilterContainer);


        filterContainer.append(projectFilterSectionContainer);
    }

    createProjectSection() {
        let filterFormContainer = document.getElementById("filter-container");
        let projectSectionHeader = document.createElement("h1");
        projectSectionHeader.textContent = "Projects";

        filterFormContainer.append(projectSectionHeader);

        let projectFilterContainer = document.createElement("div");
        projectFilterContainer.id = "project-filter"

        filterFormContainer.append(projectFilterContainer);

        let filterContainer = document.getElementById("filters");
        let addProjectButton = document.createElement("button");
        addProjectButton.textContent = "Add Project";
        addProjectButton.type = "submit";
        addProjectButton.id = "new-project-button";
        addProjectButton.style = "display: block";
        filterContainer.append(addProjectButton);
    }

    clearProjectsList() {
        let projectFormContainer = document.getElementById("project-filter");
        projectFormContainer.textContent = "";
    }

    refreshProjectList() {
        this.clearProjectsList();
        let projectsList = storageManagerInstance.getProjectsFromStorage();
        for (let i=1; i < projectsList.length; i++) {
            this.projectFilterTemplate(projectsList[i]);
        }
    }

    initializeProjectList(){
        this.createFilterForm();
        this.fixedFilterTemplate("All","none",true)
        this.fixedFilterTemplate("Inbox","project");
        this.fixedFilterTemplate("Today", "date");
        this.fixedFilterTemplate("Tomorrow", "date");
        this.createProjectSection();
        this.refreshProjectList();
    }

    readFilterList() {
        let formContainer = document.getElementById("filter-container");
        let checkedFilter = formContainer.querySelector('input[name="filter"]:checked');
        return checkedFilter
    }

    filterTaskList(filter, filterType) {
        taskListManagerInstance.loadFromStorage();
        let list = taskListManagerInstance.taskList;
        let filteredList = "";

        if (filterType === "project") {
            filteredList = list.filter((task) => task.project === filter);
        }
        else if (filterType === "date") {
            if (filter === "Today") {
                let filterDate = formatDate(new Date())
                filteredList = list.filter((task) => task.dueDate === filterDate);
            }

            else if (filter === "Tomorrow") {
                let filterDate = formatDate(getTomorrowDate());
                // let filterDate = formatDate(new Date()+1)
                filteredList = list.filter((task) => task.dueDate === filterDate);
            }

            // let filteredList = list.filter((task) => task.dueDate === filterDate);
        }

        else {
            filteredList = list;
        }

        return filteredList;        
    }

}

class displayManager {
    constructor () {
    };

    // storageInstance = new storageManager;

    editedTaskID = ""
    editedTaskCreateDate = ""

    createForm () {
        let popup = document.createElement("div");
        popup.id = "popup-container";

        let formContainer = document.createElement("form");
        formContainer.id = "input-form-container";
        formContainer.action = "";
        formContainer.method = "get";
        popup.append(formContainer);

        // Create field for task name
        let nameFieldContainer = document.createElement("div");
        // label
        let nameFieldLabel = document.createElement("label");
        let nameFieldName = "task-name";
        nameFieldLabel.for = nameFieldName;
        // nameFieldLabel.textContent = "Task Name:";
        // input
        let nameFieldInput = document.createElement("textarea");
        nameFieldInput.placeholder = "Task Name";
        nameFieldInput.rows = "4";
        nameFieldInput.cols = "40";
        nameFieldInput.id = nameFieldName;
        nameFieldInput.name = nameFieldName;
        nameFieldInput.required = true;
        nameFieldContainer.append(nameFieldLabel);
        nameFieldContainer.append(nameFieldInput);
        formContainer.append(nameFieldContainer);

        // Create field for task description
        let descFieldContainer = document.createElement("div");
        // label
        let descFieldLabel = document.createElement("label");
        let descFieldName = "task-desc";
        descFieldLabel.for = descFieldName;
        // descFieldLabel.textContent = "Description:";
        // input
        let descFieldInput = document.createElement("input");
        descFieldInput.type = "text";
        descFieldInput.id = descFieldName;
        descFieldInput.name = descFieldName;
        descFieldInput.placeholder = "Description"
        descFieldInput.size = "40";
        descFieldContainer.append(descFieldLabel);
        descFieldContainer.append(descFieldInput);
        formContainer.append(descFieldContainer);

        // Create dropdown for project
        let projectFieldContainer = document.createElement("div");
        //label
        let projectFieldLabel = document.createElement("label");
        let projectFieldName = "task-project";
        projectFieldLabel.for = projectFieldName;
        projectFieldLabel.textContent = "Project:";
        //input
        let projectFieldInput = document.createElement("select");
        projectFieldInput.id = projectFieldName;
        projectFieldInput.name = projectFieldName;
        let projectList = storageManagerInstance.getProjectsFromStorage();
        for (let i = 0;i < projectList.length; i++) {
            projectFieldInput.append(this.createListOption(projectList[i]));
        }
        projectFieldContainer.append(projectFieldLabel);
        projectFieldContainer.append(projectFieldInput);
        formContainer.append(projectFieldContainer);


        // Create dropdown for priority
        let priorityFieldContainer = document.createElement("div");
        //label
        let priorityFieldLabel = document.createElement("label");
        let priorityFieldName = "task-priority";
        priorityFieldLabel.for = priorityFieldName;
        priorityFieldLabel.textContent = "Priority:";
        //input
        let priorityFieldInput = document.createElement("select");
        priorityFieldInput.id = priorityFieldName;
        priorityFieldInput.name = priorityFieldName;
        let p1 = document.createElement("option");
        p1.value = 1;
        p1.textContent = "1";
        priorityFieldInput.append(p1);
        let p2 = document.createElement("option");
        p2.value = 2;
        p2.textContent = "2";
        priorityFieldInput.append(p2);
        let p3 = document.createElement("option");
        p3.value = 3;
        p3.textContent = "3";
        priorityFieldInput.append(p3);
        let p4 = document.createElement("option");
        p4.value = 4;
        p4.textContent = "4";
        p4.selected = "selected";
        priorityFieldInput.append(p4);
        priorityFieldContainer.append(priorityFieldLabel);
        priorityFieldContainer.append(priorityFieldInput);
        formContainer.append(priorityFieldContainer);

        // Create due date field
        let dueDateContainer = document.createElement("div");
        // label
        let dueDateLabel = document.createElement("label");
        let dueDateName = "task-duedate";
        dueDateLabel.for = dueDateName;
        dueDateLabel.textContent = "Due date:";
        // input
        let dueDateInput = document.createElement("input");
        dueDateInput.id = dueDateName;
        dueDateInput.name = dueDateName;
        dueDateInput.type = "date";
        dueDateInput.value = formatFormDate(new Date());
        dueDateContainer.append(dueDateLabel);
        dueDateContainer.append(dueDateInput);
        formContainer.append(dueDateContainer);

        let buttonContainer = document.createElement("div");
        buttonContainer.id = "input-button-container";
        // Create submit button
        let submitButton = this.createSubmitButton();

        buttonContainer.append(submitButton);

        // Create cancel button
        let cancelButton = this.createCancelButton();

        buttonContainer.append(cancelButton);
        formContainer.append(buttonContainer);
        popup.style.display = "none";

        return popup;
    }

    createSubmitButton() {
        let submitButton = document.createElement("button");
        submitButton.id = "submit-button";
        submitButton.class = "popup-button";
        submitButton.type = "submit";
        submitButton.textContent = "Submit";
        
        return submitButton;
    }

    createCancelButton() {
        let cancelButton = document.createElement("button");
        cancelButton.id = "cancel-button";
        cancelButton.class = "popup-button";
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";

        return cancelButton;
    }
    
    createProjectForm() {
        let projectPopupContainer = document.createElement("div");
        projectPopupContainer.id = "project-popup-container";
        
        let projectForm = document.createElement("form");
        projectForm.id = "project-form"
        projectForm.action = "";
        projectForm.method = "get";
        projectPopupContainer.append(projectForm);

        // Create input field container
        let inputFieldContainer = document.createElement("div");
        projectForm.append(inputFieldContainer);
        
        // Create label
        let projectLabel = document.createElement("label");
        let projectName = "project-name";
        projectLabel.for = projectName;
        // projectLabel.textContent = "Project Name: ";
        inputFieldContainer.append(projectLabel);

        // Create input
        let projectInput = document.createElement("input");
        projectInput.id = projectName;
        projectInput.name = projectName;
        projectInput.required = true;
        projectInput.placeholder = "Project Name";
        projectInput.size = "40";
        inputFieldContainer.append(projectInput);

        let buttonContainer = document.createElement("div");
        buttonContainer.id = "project-form-button-container";
        // Create submit button
        let submitButton = this.createSubmitButton();

        // projectForm.append(submitButton);
        buttonContainer.append(submitButton);

        // Create cancel button
        let cancelButton = this.createCancelButton();

        // projectForm.append(cancelButton);
        buttonContainer.append(cancelButton);

        projectForm.append(buttonContainer);

        projectPopupContainer.style.display = "none";

        return projectPopupContainer;

    }
    
    createListOption(project) {
        let option = document.createElement("option");
        option.value = project;
        option.textContent = project;

        return option
    }

    greyBackground() {
        let backgroundOverlay = document.createElement("div");
        backgroundOverlay.id = "greyBackgroundOverlay"
        backgroundOverlay.style.display = "none";
        backgroundOverlay.style.backgroundColor = "rgb(0 0 0 /0.5)";

        return backgroundOverlay;
    }

    hideByElementID(id) {
        let elementContainer = document.getElementById(id);
        elementContainer.style.display = "none";
    }

    removeByElementID(id) {
        let elementContainer = document.getElementById(id);
        elementContainer.remove();
    }

    showByElementID(id) {
        let elementContainer = document.getElementById(id);
        elementContainer.style.display = "block";
    }

    showPopup(edit = false) {
        let bodyContainer = document.querySelector("body");
        let backgroundOverlay = this.greyBackground();
        backgroundOverlay.style.display = "block";

        let form = this.createForm();
        form.style.display = "block";

        bodyContainer.append(backgroundOverlay);
        bodyContainer.append(form);

        if (edit) {
            // Add special submit and cancel button actions
            this.addSubmitButtonListener(true);
            this.addCancelButtonListener(true);
        }
        else {
            this.addSubmitButtonListener();
            this.addCancelButtonListener();
        }
        
    }

    showProjectPopup() {
        let bodyContainer = document.querySelector("body");
        let backgroundOverlay = this.greyBackground();
        backgroundOverlay.style.display = "block";

        let form = this.createProjectForm();
        form.style.display = "block";

        bodyContainer.append(backgroundOverlay);
        bodyContainer.append(form);

        this.addSubmitProjectButtonListener();
        this.addCancelProjectButtonListener();
    }

    popupSubmit(edit = false) {
        let taskName = document.getElementById("task-name").value;
        let desc = document.getElementById("task-desc").value;
        let project = document.getElementById("task-project").value;
        let priority = document.getElementById("task-priority").value;
        let dueDate = document.getElementById("task-duedate").value.replace(/-/g,'\/');
        let createDate = this.editedTaskCreateDate;
        let id = this.editedTaskID;
        let popupDict = '';
        
        if (edit) {
            popupDict = {name: taskName, desc: desc, project: project, priority: priority, dueDate: dueDate, createDate: createDate, id: id}
        }
        else {
            popupDict = {name: taskName, desc: desc, project: project, priority: priority, dueDate: dueDate}
        }

        // console.log(popupDict);
        let task = new Task(popupDict);

        storageManagerInstance.appendToStorage(task);
        // Tell the task list manager to read from storage
    }

    fillTaskPopup(task) {
        document.getElementById("task-name").defaultValue = task.name;
        document.getElementById("task-desc").defaultValue = task.desc;
        document.getElementById("task-project").value = task.project;
        document.getElementById("task-priority").value = task.priority;
        document.getElementById("task-duedate").value = formatFormDate(new Date(task.dueDate));
    }

    projectPopupSubmit() {
        let projectName = document.getElementById("project-name").value;
        storageManagerInstance.addProject(projectName);
    }

    addProjectButtonListener() {
        let addProjectButtonContainer = document.getElementById("new-project-button");

        addProjectButtonContainer.addEventListener("click", (e) => {
            this.showProjectPopup();
            this.hideByElementID("new-project-button");
        })
    }

    addTaskButtonListener() {
        let addTaskButtonContainer = document.getElementById("new-task-button");

        addTaskButtonContainer.addEventListener("click", (e) => {
            this.showPopup();
            this.hideByElementID("new-task-button");
        }
        );
    };

    addCancelButtonListener(edit = false) {
        let cancelButtonContainer = document.getElementById("cancel-button");

        cancelButtonContainer.addEventListener("click", (e) => {
            e.preventDefault();
            if (edit) {
                this.popupSubmit(true);
            }
            this.removeByElementID("popup-container");
            this.removeByElementID("greyBackgroundOverlay");
            this.showByElementID("new-task-button");
        })
    }

    addCancelProjectButtonListener() {
        let cancelProjectButtonContainer = document.getElementById("cancel-button");

        cancelProjectButtonContainer.addEventListener("click", (e) => {
            this.removeByElementID("project-popup-container");
            this.removeByElementID("greyBackgroundOverlay");
            this.showByElementID("new-project-button");
        })
    }

    addSubmitButtonListener(edit = false) {
        let popupContainer = document.getElementById("popup-container");

        popupContainer.addEventListener("submit", (e) => {
            e.preventDefault();
            if (edit) {
                this.popupSubmit(true);
            }
            else {
                this.popupSubmit();
            }
            this.removeByElementID("popup-container");
            this.removeByElementID("greyBackgroundOverlay");
            this.showByElementID("new-task-button");
        })
    }

    addSubmitProjectButtonListener() {
        let projectPopupContainer = document.getElementById("project-popup-container");

        projectPopupContainer.addEventListener("submit", (e) => {
            e.preventDefault();
            this.projectPopupSubmit();
            this.removeByElementID("project-popup-container");
            this.removeByElementID("greyBackgroundOverlay");
            this.showByElementID("new-project-button");
            filterManagerInstance.refreshProjectList();
        })
    }

    addDeleteButtonListener() {
        let taskListContainer = document.getElementById("tasks");

        taskListContainer.addEventListener("click", (e) => {
            if (e.target && e.target.matches("#task-delete-button")) {
                storageManagerInstance.deleteFromStorage(e.target.parentNode.parentNode.id);
            }
        })
    }

    addEditButtonListener() {
        let taskListContainer = document.getElementById("tasks");
        taskListContainer.addEventListener("click", (e) => {
            if (e.target && e.target.matches(".task-edit-button")) {
                let taskID = e.target.parentNode.parentNode.id;
                let task = storageManagerInstance.getItemFromStorage(taskID);
                this.storeExtraTaskData(task.id, task.createDate);
                storageManagerInstance.deleteFromStorage(taskID);
                displayManagerInstance.showPopup(true);
                displayManagerInstance.fillTaskPopup(task);
            }
        })
    }

    addDeleteProjectButtonListener() {
        let projectListContainer = document.getElementById("project-filter");

        projectListContainer.addEventListener("click", (e) => {
            if (e.target && e.target.matches(".project-delete-button")) {
                let projectID = e.target.parentNode.id;
                storageManagerInstance.deleteProject(projectID);
                storageManagerInstance.deleteTasksAssociatedWithProject(projectID);
                filterManagerInstance.refreshProjectList();
            }
        })
    }

    addFilterListener(){
        let filterContainer = document.getElementById("filter-container");

        filterContainer.addEventListener("click", (e) => {
            if (e.target && e.target.matches("input[type='radio']")) {
                // let filterName = e.target.value;
                // let filterType = e.target.className;
                // // console.log(filterName, filterType)
                // // filterManagerInstance.filterTaskList(filterName, filterType);
                // filterManagerInstance.readFilterList();

                this.pushToTaskListContainer();
            }
        })
    }

    pushToTaskListContainer () {
        let taskListContainer = document.getElementById("tasks");
        taskListContainer.textContent = '';
        // taskListManagerInstance.loadFromStorage();
        // let list = taskListManagerInstance.taskList;
        let checkedFilter = filterManagerInstance.readFilterList();
        let filterName = checkedFilter.value;
        let filterType = checkedFilter.className;
        let list = filterManagerInstance.filterTaskList(filterName, filterType);
        for (let i = 0; i < list.length; i++) {
            taskListContainer.append(list[i].asHTML());
        }
    }

    checkForTasks() {
        if (Object.keys(storageManagerInstance.getAllFromStorage()).length > 0) {
            this.pushToTaskListContainer();
        }
    }

    storeExtraTaskData(id, createDate) {
        this.editedTaskID = id;
        this.editedTaskCreateDate = createDate;
    }

}

class storageManager {
    constructor () {
        this.initializeProjectStorage();
        // this.addProject("test1");
        // this.addProject("test2");
    };

    readStorageKeys (storage) {
        const storageKeys = Object.keys(storage);
        return storageKeys;
    }

    initialWriteToStorage () {
        pass;
    }

    getItemFromStorage(key) {
        let taskDict = localStorage.getItem(key);
        let taskParsed = JSON.parse(taskDict);
        return taskParsed
    }

    getAllFromStorage() {
        const storageKeys = Object.keys(localStorage);
        let dict = {};

        for (let key of storageKeys) {
            if (key != "projects"){
                dict[key] = this.getItemFromStorage(key);
            }
        }

        return dict;
    }

    appendToStorage (task) {
        localStorage.setItem(task.id, JSON.stringify(task.asDictionary()));
        displayManagerInstance.pushToTaskListContainer();
    };

    deleteFromStorage (key) {
        localStorage.removeItem(key);
        displayManagerInstance.pushToTaskListContainer();
    }

    writeToProjectStorage(obj){
        localStorage.setItem("projects", JSON.stringify(obj));
    }

    getProjectsFromStorage() {
        let projectObj = this.getItemFromStorage("projects");
        return projectObj;
    }

    addProject(project) {
        let projects = this.getProjectsFromStorage();
        if (!projects.includes(project)) {
            projects.push(project);
            this.writeToProjectStorage(projects);
        }
    }

    deleteProject(project) {
        let projects = this.getProjectsFromStorage();
        if (projects.includes(project)) {
            let index = projects.indexOf(project);
            projects.splice(index, 1);
            this.writeToProjectStorage(projects);
        }
    }

    deleteTasksAssociatedWithProject(project) {
        let storedTasks = this.getAllFromStorage();
        for (let [key, value] of Object.entries(storedTasks)) {
            if (value.project === project) {
                this.deleteFromStorage(key);
            }
        };
    }
    
    initializeProjectStorage() {
        if (!localStorage.getItem("projects")) {
            this.writeToProjectStorage([]);
            this.addProject("Inbox");
        }
    }
}

class todoListInitializer {
    constructor() {
        this.initialize();
    };

    // displayManagerInstance = new displayManager;
    // storageManagerInstance = new storageManager;
    // taskManagerInstance = new taskManager;
    // taskListManagerInstance = new taskListManager;
    // filterManagerInstance = new filterManager;

    initialize() {
        // let displayManagerInstance = new displayManager;
        // let storageManagerInstance = new storageManager;
        // let taskManagerInstance = new taskManager;
        // let taskListManagerInstance = new taskListManager;
        // let filterManagerInstance = new filterManager;

        displayManagerInstance.addTaskButtonListener();
        displayManagerInstance.addDeleteButtonListener();
        displayManagerInstance.addEditButtonListener();
        filterManagerInstance.initializeProjectList();
        displayManagerInstance.addProjectButtonListener();
        displayManagerInstance.addDeleteProjectButtonListener();
        displayManagerInstance.addFilterListener();
        displayManagerInstance.checkForTasks();
        

        // return {displayManagerInstance,
        //         storageManagerInstance,
        //         taskManagerInstance,
        //         taskListManagerInstance,
        //         filterManagerInstance
        // }
    }
}

// let [displayManagerInstance,
//      storageManagerInstance,
//      taskManagerInstance,
//      taskListManagerInstance,
//      filterManagerInstance] = new todoListInitializer()

// localStorage.clear();

let displayManagerInstance = new displayManager;
let storageManagerInstance = new storageManager;
let taskManagerInstance = new taskManager;
let taskListManagerInstance = new taskListManager;
let filterManagerInstance = new filterManager;
new todoListInitializer();

// // newTask = new Task({ name: "Make bed", dueDate: new Date(2025, 2, 15) });
// let newTask = new Task({ name: "Make bed", dueDate: new Date("Mar 15,2025") });
// // let storageManagerInstance = new storageManager;
// storageManagerInstance.appendToStorage(newTask);

// console.log(displayManagerInstance);
// console.log(storageManagerInstance);
// console.log(taskManagerInstance);
// console.log(taskListManagerInstance);
// console.log(storage.getItemFromStorage(newTask.id))
// let repeatTask = storageManagerInstance.getItemFromStorage(newTask.id);
// let newTask2 = new Task(repeatTask);
// storageManagerInstance.appendToStorage(newTask2);

// displayManagerInstance.addTaskButtonListener();
// displayManagerInstance.addDeleteButtonListener();
// displayManagerInstance.addProjectButtonListener();
// displayManagerInstance.addDeleteProjectButtonListener();
// displayManagerInstance.addFilterListener();

// filterManagerInstance.createFilterForm();

// display.pushToTaskListContainer();


// taskContainer.append(newTask3.asHTML());
// console.log(newTask.createDate)
// console.log(newTask.displayDueDate());

// taskArray = [newTask];

// todoListWriter(taskArray);

// dateOld = new Date(2025, 8, 15);
// dateNew = new Date(2025, 8, 17);

// console.log(dateOld)
// console.log(dateNew - dateOld);

