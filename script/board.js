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
            generatePrioInTask(tasks.indexOf(element), element);
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
            generatePrioInTask(tasks.indexOf(element), element);
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
            generatePrioInTask(tasks.indexOf(element), element);
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
            generatePrioInTask(tasks.indexOf(element), element);
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
    <div id="board-task-${tasks.indexOf(currentTask)}" draggable="true" onclick="boardShowTask(${currentTask})" ondragstart="startDragging(${tasks.indexOf(currentTask)})" class="task-card">
        <span class="box-category" style="background-color: ${currentTask['categoryColor']}">${currentTask['categoryType']}</span>
        <h6>${currentTask['title']}</h6>
        <p>${currentTask['description']}</p>
        <div style="display: flex; justify-content: space-between">
        <div style="display: flex; padding-left: 8px" id="box-contacts-${tasks.indexOf(currentTask)}"></div>
        <img style="object-fit: contain" id="box-prio-${tasks.indexOf(currentTask)}">
        </div>
    </div>
    `;
}

/**
 * This function generates the contacts icons with initals in the tasks
 */

function generateContactsInTask(index) {
    let contactField = document.getElementById(`box-contacts-${index}`);
    contactField.innerHTML = ``;
    for (let i = 0; i < currentContacts.length; i++) {
        let bgColor = currentContacts[i][0]['bgcolor'];
        let initals = currentContacts[i][0]['initals'];
        contactField.innerHTML += openAssignedUserHTML(bgColor, initals);
    }
}

/**
 * This function generates the prio logos in the tasks 
 */

function generatePrioInTask(index, currentTask) {
    let prioIcon = document.getElementById(`box-prio-${index}`);
    prioIcon.innerHTML = ``;
    if(currentTask['prio'] == 'urgent'){
        prioIcon.setAttribute("src", "./assets/img/icons/add-task-urgent.svg"); 
    };
    if(currentTask['prio'] == 'medium'){
        prioIcon.setAttribute("src", "./assets/img/icons/add-task-medium.svg"); 
    };
    if(currentTask['prio'] == 'low'){
        prioIcon.setAttribute("src", "./assets/img/icons/add-task-low.svg"); 
    }
}

/**
 * This function filters the whole contacts to only that ones, that accure in the current task
 */

function filterContactsFromTask(currentTask) {
    currentContacts = [];
    for (let index = 0; index < currentTask['contact'].length; index++) {
        const currentContact = currentTask['contact'][index];
        let currentContactFromBackend = contacts.filter(c => c['fullname'] == currentContact);
        currentContacts.push(currentContactFromBackend);
    }
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
    furtherFunctionsToValidate();
}

async function furtherFunctionsToValidate(){
    pushChosenSubtasks(); // not a required field
    sendFormToBackend();
    await includeHTML();
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    setStartCategory(category);
    window.location.reload();
}

/**
 * This functions filters the rendered tasks on board
 */

function boardFilterTasks() {
    let search = document.getElementById('board-task-search').value;
    search = search.toLowerCase();
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i]['title'].toLowerCase().includes(search) && !document.getElementById(`board-task-${i}`).classList.contains('d-none')) {
            document.getElementById(`board-task-${i}`).classList.add('d-none')
        };
        if (tasks[i]['title'].toLowerCase().includes(search) && document.getElementById(`board-task-${i}`).classList.contains('d-none')) {
            document.getElementById(`board-task-${i}`).classList.remove('d-none');
        }
    }
}

/**
 * This function opens a popup with the current selected task
 */

function boardShowTask(currentTask){
    document.getElementById('board-open-task').classList.remove('d-none')
}