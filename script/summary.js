/**
 * summary.js contains all functions that are relevant for the summary.html.
 * @author Daniel Hartmann
 * @version 1.0
 */

/**
 * To initialize all functions on the summary.html that are required for building the page.
 * @async
 */
async function initSummary() {
    await init();
    summaryGreetings();
    countUrgent();
    findDeadline();
    countTaskTodoAndDone();
    countBoardTopSection();
}


/**
 * Generates a greeting message based on the current time of day and 
 * displays it on the HTML element with id 'summary-greeting'.
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

/**
 * Counts how many tasks with priority "urgent" are in the tasks array, 
 * updates the urgent tasks count display.
 */
function countUrgent() {
    let urgentCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        let taskPrio = tasks[i].prio;
        if (taskPrio === 'urgent') {
            urgentCount++;
        }
    }
    document.getElementById('summary-urgent-count').innerHTML = urgentCount;
}

/**
 * Find the lowest date in the tasks array.
 * Converts milliseconds to: 'en-US', {month: 'long', day: 'numeric', year: 'numeric'}.
 */
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
    document.getElementById('summary-find-deadline').innerHTML = formattedDate;
}

/**
 * Counts how many tasks in the category section with "to-do" or "done" are in the tasks array, 
 * updates the urgent tasks count display.
 */
function countTaskTodoAndDone() {
    let toDoCount = 0;
    let doneCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        let taskToDo = tasks[i].category;
        if (taskToDo === 'to-do' || taskToDo === 'in-progress' || taskToDo === 'awaiting-feedback') {
            toDoCount++;
        }
        if (taskToDo === 'done') {
            doneCount++;
        }
    }

    document.getElementById('summary-to-do-count').innerHTML = toDoCount;
    document.getElementById('summary-done-count').innerHTML = doneCount;
}

/**
 * Counts how many tasks in the category section with "in-progress" or "feedback" are in the tasks array, 
 * updates the urgent tasks count display.
 * Count and displays how many tasks are in the Board.
 */
function countBoardTopSection() {
    let inProgress = 0;
    let feedback = 0;
    let taskBoardCount = tasks.length;

    for (let i = 0; i < tasks.length; i++) {
        let taskBoard = tasks[i].category;
        if(taskBoard === 'in-progress') {
            inProgress++;
        }
        if(taskBoard === 'feedback') {
            feedback++;
        }
    }
    
    document.getElementById('summary-count-progress').innerHTML = inProgress;
    document.getElementById('summary-count-feedback').innerHTML = feedback;
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
}]