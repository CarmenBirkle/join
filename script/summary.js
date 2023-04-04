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






/////////////////////// TEST FUNCTION //////////////////////////////////

function countUrgent() {
    let urgentCount = 0;
    for (let i = 0; i < testTasks.length; i++) {
        let taskPrio = testTasks[i].prio;
        if (taskPrio === 'Urgent') {
            urgentCount++;
        }
    }
    console.log('Anzahl der Aufgaben mit prio "Urgent": ' + urgentCount);
}

function findDeadline() {
    let lowestDate = Infinity;
    for (let i = 0; i < testTasks.length; i++) {
        let milliseconds = testTasks[i].date;
        if (milliseconds < lowestDate) {
            lowestDate = milliseconds;
        }
    }
    const date = new Date(lowestDate);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    console.log(formattedDate);
}

let testTasks = [{
    'number': 1,
    'title': 'Call potential clients',
    'description': 'Make the product presentation to prospective buyers',
    'categoryColor': '#FC71FF',
    'categoryType': 'Sales',
    'category': 'to-do',
    'contact': ['David Eisenberg', 'Benedikt Ziegler', 'Marcel Bauer', 'Stefanie Farber'],
    'date': 1367644800000,
    'prio': 'Urgent',
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
    'prio': 'Medium',
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
    'prio': 'Urgent',
    'subtask': ''
} ]