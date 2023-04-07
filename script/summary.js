async function initSummary() {
    await init();
    summaryGreetings();
    countUrgent();
    findDeadline();
    countTaskCategory();
}



/**
 * Automatic greetings based on time
 * 
 */
function summaryGreetings() {
    let currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good morning,"
    } else if (currentHour < 18) {
        greeting = "Good afternoon,"
    } else {
        greeting = "Good evening,"
    }

    document.getElementById('summary-greeting').innerHTML = greeting;
}

function countUrgent() {
    let urgentCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        let taskPrio = tasks[i].prio;
        if (taskPrio === 'urgent') {
            urgentCount++;
        }
    }
    console.log('Anzahl der Aufgaben mit prio "Urgent": ' + urgentCount);
    document.getElementById('summary-urgent-count').innerHTML = urgentCount;
}

function findDeadline() {
    let lowestDate = Infinity;
    for (let i = 0; i < tasks.length; i++) {
        let milliseconds = tasks[i].date;
        if (milliseconds < lowestDate) {
            lowestDate = milliseconds;
        }
    }
    const date = new Date(lowestDate);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    console.log(formattedDate);
    document.getElementById('summary-find-deadline').innerHTML = formattedDate;
}

function countTaskCategory() {
    let toDoCount = 0;
    let doneCount = 0;
    let taskBoardCount = tasks.length;

    for (let i = 0; i < tasks.length; i++) {
        let taskToDo = tasks[i].category;
        if (taskToDo === 'to-do' || taskToDo === 'in-progress' || taskToDo === 'awaiting-feedback') {
            toDoCount++;
        } 
        if(taskToDo === 'done') {
            doneCount++;
        }
    }
    
    document.getElementById('summary-to-do-count').innerHTML = toDoCount;
    document.getElementById('summary-done-count').innerHTML = doneCount;
    document.getElementById('summary-task-in-borad').innerHTML = taskBoardCount;
}




/////////////////////// TEST FUNCTION //////////////////////////////////

let testTasks = [{
    'number': 1,
    'title': 'Call potential clients',
    'description': 'Make the product presentation to prospective buyers',
    'categoryColor': '#FC71FF',
    'categoryType': 'Sales',
    'category': 'to-do',
    'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
    'date': 1367644800000,
    'prio': 'prio-urgent',
    'subtask': ''
}, {
    'number': 2,
    'title': 'Call potential clients',
    'description': 'Make the product presentation to prospective buyers',
    'categoryColor': '#FC71FF',
    'categoryType': 'Sales',
    'category': 'in-progress',
    'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
    'date': 1667644800000,
    'prio': 'prio-medium',
    'subtask': ''
}, {
    'number': 2,
    'title': 'Call potential clients',
    'description': 'Make the product presentation to prospective buyers',
    'categoryColor': '#FC71FF',
    'categoryType': 'Sales',
    'category': 'in-progress',
    'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
    'date': 1167644800000,
    'prio': 'prio-urgent',
    'subtask': ''
} ]