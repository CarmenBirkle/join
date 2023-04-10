/**
 * summary.js contains all functions that are relevant for the summary.html.
 * @author Daniel Hartmann
 * @version 1.0
 */

/**
 * To initialize all functions on the summary.html that are required for building the page.
 * @async - await init(); Load content from backend (contacts, users, tasks).
 */
async function initSummary() {
    await init();
    summaryGreetingResponsive();
    summaryGreetings();
    changeGreetingName();
    countUrgent();
    findDeadline();
    countTaskTodoAndDone();
    countBoardTopSection();
}

/**
 * Generates a greeting message based on the current time of day and displays it.
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
 * If no match was found, Guest will be displayed.
 */
function changeGreetingName() {
    let cookieValue = document.cookie;
    let nameFromCookie = cookieValue.split(';').find(cookie => cookie.includes('user='));
    
    showsGreetingName(nameFromCookie);
}

/**
 * Looks in the users array for a match with the cookie name and displayed it.
 * If no name found in the cookie, Guest will be displayed.
 * @param {String} nameFromCookie - Name from the user that was found in the cookie.
 */
function showsGreetingName(nameFromCookie) {
    if(nameFromCookie === undefined) {
        document.getElementById('summary-greeting-name').innerHTML = 'Guest';
        document.getElementById('summary-greeting-name-responsive').innerHTML = 'Guest';
    } else {
        let nameCookieFormatted = nameFromCookie.split('=')[1];
        const selectedUser = users.find(user => user.name.toLowerCase().replace(' ', '') === nameCookieFormatted);
        
        document.getElementById('summary-greeting-name').innerHTML = selectedUser.name;
        document.getElementById('summary-greeting-name-responsive').innerHTML = selectedUser.name;
    }
}

/**
 * Plays a welcome animation after logging in. 
 * @returns - If the screen is larger than 1350 or the welcome responsive animation has already played, the function will be aborted.
 */
function summaryGreetingResponsive() {
    if (window.innerWidth > 1350 || checkGreetingResponsiveCookie()) {
        document.getElementById('summary-welcome-responsive').classList.add('d-none');
        console.log('Zu groß oder Greeting wurde bereits durchgeführt.'); // TEST !!!!!!!!!!!
        return;
    }

    showsGreetingResponsiveAnimation();
    setGreetingResponsiveCookie();
}

/**
 * Runs the welcome animation after logging in.
 */
function showsGreetingResponsiveAnimation() {
    console.log("Greeting wird durchgeführt..."); // TEST !!!!!!!!!!!!!!!!!!!
    document.getElementById('summary-welcome-responsive').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('summary-welcome-responsive').classList.add('summary-welcome-animation');
        setTimeout(() => {
            document.getElementById('summary-welcome-responsive').classList.add('d-none');
        }, 1000);
    }, 2000);
}

/**
 * Looks for 'validationDone=true' in the cookie.
 * @returns - true or false
 */
function checkGreetingResponsiveCookie() {
    const cookieValue = document.cookie;
    return cookieValue.includes('validationDone=true');
    /*let cookieValue = document.cookie;
    let validateGreetingCookie = cookieValue.split(';').find(cookie => cookie.includes('validationDone='));
    if (validateGreetingCookie) {
        let validateGreetingValue = validateGreetingCookie.split('=')[1];
        if (validateGreetingValue === 'true') {
            return true;
        }
    }
    return false;*/
}

/**
 * Sets a cookie with a lifetime of one hour.
 * getCookieExpireTime() = calculates the lifetime.
 */
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
 */
function findDeadline() {
    let lowestDate = Infinity;

    for (let i = 0; i < tasks.length; i++) {
        let milliseconds = tasks[i].date;
        if (milliseconds < lowestDate) {
            lowestDate = milliseconds;
        }
    }

    showDeadline(lowestDate);
}

/**
 * Converts milliseconds to: 'en-US', {month: 'long', day: 'numeric', year: 'numeric'}.
 * Show deadline datum.
 * @param {Number} lowestDate - (Date) in milliseconds
 */
function showDeadline(lowestDate) {
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
