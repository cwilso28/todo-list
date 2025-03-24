class Task {
    constructor(name, desc = '', project = 'Inbox', dueDate = new Date(new Date().toDateString())) {
        this.name = name;
        this.desc = desc;
        this.project = project;
        this.dueDate = dueDate;
    };

    createDate  = new Date(new Date().toDateString());

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

newTask = new Task("Make bed","","", new Date(2025, 2, 15));
console.log(newTask.name);
// console.log(newTask.createDate)
console.log(newTask.displayDueDate());

// dateOld = new Date(2025, 8, 15);
// dateNew = new Date(2025, 8, 17);

// console.log(dateOld)
// console.log(dateNew - dateOld);

