let currentDraggedElement;
let currentContacts;

/**
 * This function renders all the Tasks on the board
 */

async function renderTasks() {
    await includeHTML();
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    renderTasksToDo();
    renderTasksInProgress();
    renderTasksAwaitingFeedback();
    renderTasksDone();
}

/**
 * This function renders the "to do" Tasks on the board
 */

function renderTasksToDo() {
    let toDo = tasks.filter(t => t['category'] == 'to-do');
    document.getElementById('to-do').innerHTML = ``;
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        if (element) {
            document.getElementById('to-do').innerHTML += generateTaskHTML(element);
            generateContactsInTask(tasks.indexOf(element));
        }
    }
}

/**
 * This function renders the "in progress" Tasks on the board
 */

function renderTasksInProgress() {
    let inProgress = tasks.filter(t => t['category'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = ``;
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        if (element) {
            document.getElementById('in-progress').innerHTML += generateTaskHTML(element);
            generateContactsInTask(tasks.indexOf(element));
        }
    }
}

/**
 * This function renders the "awaiting feedback" Tasks on the board
 */

function renderTasksAwaitingFeedback() {
    let awaitingFeedback = tasks.filter(t => t['category'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = ``;
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        if (element) {
            document.getElementById('awaiting-feedback').innerHTML += generateTaskHTML(element);
            generateContactsInTask(tasks.indexOf(element));
        }
    }
}

/**
 * This function renders the "done" Tasks on the board
 */

function renderTasksDone() {
    let done = tasks.filter(t => t['category'] == 'done');
    document.getElementById('done').innerHTML = ``;
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        if (element) {
            document.getElementById('done').innerHTML += generateTaskHTML(element);
            generateContactsInTask(tasks.indexOf(element));
        }
    }
}


/**
 *  This function generates the HTML Code for a Task Card, task variables are given by parent function
 * (Design is not completed yet!!!)
 */
function generateTaskHTML(currentTask) {
    filterContactsFromTask(currentTask);
    return `
    <div draggable="true" ondragstart="startDragging(${tasks.indexOf(currentTask)})" class="task-card">
        <span class="box-category" style="background-color: ${currentTask['categoryColor']}">${currentTask['categoryType']}</span>
        <h6>${currentTask['title']}</h6>
        <p>${currentTask['description']}</p>
        <div style="display: flex; justify-content: space-between"><div style="display: flex; padding-left: 8px" id="box-contacts-${tasks.indexOf(currentTask)}"></div><span>${currentTask['prio']}</span></div>
    </div>
    `;
}

function generateContactsInTask(index) {
    let contactField = document.getElementById(`box-contacts-${index}`);
    contactField.innerHTML = ``;
    for (let i = 0; i < currentContacts.length; i++) {
        let bgColor = currentContacts[i][0]['bgcolor'];
        let initals = currentContacts[i][0]['initals'];
        console.log(bgColor, initals);
        contactField.innerHTML += openAssignedUserHTML(bgColor, initals);
    }
}

function filterContactsFromTask(currentTask) {
    currentContacts = [];
    for (let index = 0; index < currentTask['contact'].length; index++) {
        const currentContact = currentTask['contact'][index];
        console.log(currentContact);
        let currentContactFromBackend = contacts.filter(c => c['fullname'] == currentContact);
        console.log(currentContactFromBackend);
        currentContacts.push(currentContactFromBackend);
    }
    console.log('Current Contacts', currentContacts);
}


/**
 * This functions all the tasks to be dragged and dropped
 */

function startDragging(currentTaskIndex) {
    currentDraggedElement = currentTaskIndex;
}

function allowDrop(ev) {
    ev.preventDefault();

}

async function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    await backend.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

/**
 * This function sets a fixed category of a given task (to push tasks directly into one of the four 
 * different task containers)
 */

async function setStartCategory(category) {
    tasks[tasks.length - 1]['category'] = category;
    await backend.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

/**
 * This function opens the add tasks popup
 */

function boardOpenAddTask(category) {
    document.getElementById('board-add-task').classList.remove('d-none');
    document.getElementById('board-content').classList.add('d-none');
    if (category) {
        document.getElementById('task-form-submit').setAttribute("onsubmit", `boardValidateForm(${category}); return false`);
    }
}

/**
 * This function closes the add tasks popup
 */

function boardCloseAddTask() {
    document.getElementById('board-add-task').classList.add('d-none');
    document.getElementById('board-content').classList.remove('d-none');
}

/**
 * This function submits the new task into the backend array
 * (only if the category is not "to-do")
 */

async function boardValidateForm(category) {
    if (chosenCategoryType.length === 0 || chosenCategoryColor.length === 0) {
        renderCategoryError();
        return;
    } if (chosenPrioButton.length === 0) {
        renderPrioButtonError();
        return;
    }
    pushChosenAssignedTo();
    if (chosenAssignedTo.length === 0) {
        renderAssignedToError();
        return;
    }
    pushChosenSubtasks(); // not a required field
    sendFormToBackend();
    await includeHTML();
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    setStartCategory(category);
    window.location.reload();
}