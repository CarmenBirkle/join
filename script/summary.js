/**
 * summary.js contains all functions that are relevant for the summary.html.
 * @author Daniel Hartmann
 * @version 1.0
 */

/**
 * To initialize all functions on the summary.html that are required for building the page.
 * @async - await init();
 */
async function initSummary() {
    await init();
    summaryGreetings();
    changeGreetingName();
    summaryGreetingResponsive();
    countUrgent();
    findDeadline();
    countTaskTodoAndDone();
    countBoardTopSection();
}

/**
 * Generates a greeting message based on the current time of day and displays it on the HTML element with id 'summary-greeting'.
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
    document.getElementById('summary-greeting-responsive').innerHTML = greeting;
}

/**
 * Generates a personalized greeting by retrieving the user's name from a cookie and searching for a matching user in the "users" array.
 */
function changeGreetingName() {
    let cookieValue  = document.cookie;
    let nameFromCookie = cookieValue.split(';').find(cookie => cookie.includes('user='));
    let nameCookieFormatted = nameFromCookie.split('=')[1];

    const selectedUser = users.find(user => user.name.toLowerCase().replace(' ', '') === nameCookieFormatted);

    if (selectedUser === undefined) {
        document.getElementById('summary-greeting-name').innerHTML = 'Guest';
        document.getElementById('summary-greeting-name-responsive').innerHTML = 'Guest';
    } else {
        document.getElementById('summary-greeting-name').innerHTML = selectedUser.name;
        document.getElementById('summary-greeting-name-responsive').innerHTML = selectedUser.name;
    }

    /*for (let i = 0; i < users.length; i++) {
        let userName = users[i].name;
        let formattedName = userName.toLowerCase().replace(/ /g, '');
        if (formattedName.includes(nameCookieFormatted)) {
            document.getElementById('summary-greeting-name').innerHTML = userName;
        } else {
            document.getElementById('summary-greeting-name').innerHTML = 'Guest';
        }
    }*/
}

function summaryGreetingResponsive() {
    if (window.innerWidth > 1350) {
        console.log('Zu groß');
        return;
    }
    if (checkGreetingResponsiveCookie()) {
        console.log("Greeting wurde bereits durchgeführt.");
        return;
    }

    console.log("Greeting wird durchgeführt...");
    document.getElementById('summary-welcome-responsive').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('summary-welcome-responsive').classList.add('summary-welcome-animation');
    }, 2000);
    setTimeout(() => {
        document.getElementById('summary-welcome-responsive').classList.add('d-none');
    }, 3000);
    setGreetingResponsiveCookie();
}

function checkGreetingResponsiveCookie() {
    let cookieValue = document.cookie;
    let validateGreetingCookie = cookieValue.split(';').find(cookie => cookie.includes('validationDone='));
    if (validateGreetingCookie) {
        let validateGreetingValue = validateGreetingCookie.split('=')[1];
        if (validateGreetingValue === 'true') {
            return true;
        }
    }
    return false;
}

function setGreetingResponsiveCookie() {
    let now = getCookieExpireTime();
    document.cookie = "validationDone=true; expires=" + now.toUTCString() + "; path=/";
}

/**
 * Counts how many tasks with priority "urgent" are in the tasks array, updates the urgent tasks count display.
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
 * Counts how many tasks in the category section with "to-do" or "done" are in the tasks array, updates the urgent tasks count display.
 */
function countTaskTodoAndDone() {
    let toDoCount = 0;
    let doneCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        let taskToDo = tasks[i].category;
        if (taskToDo === 'to-do') {
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
 * Counts how many tasks in the category section with "in-progress" or "feedback" are in the tasks array, updates the urgent tasks count display.
 * Count and displays how many tasks are in the Board.
 */
function countBoardTopSection() {
    let inProgress = 0;
    let feedback = 0;
    let taskBoardCount = tasks.length;

    for (let i = 0; i < tasks.length; i++) {
        let taskBoard = tasks[i].category;
        if (taskBoard === 'in-progress') {
            inProgress++;
        }
        if (taskBoard === 'awaiting-feedback') {
            feedback++;
        }
    }

    document.getElementById('summary-count-progress').innerHTML = inProgress;
    document.getElementById('summary-count-feedback').innerHTML = feedback;
    document.getElementById('summary-task-in-borad').innerHTML = taskBoardCount;
}

