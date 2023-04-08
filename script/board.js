let currentDraggedElement;

/**
 * This function renders the Tasks on the board
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

function renderTasksToDo() {
    let toDo = tasks.filter(t => t['category'] == 'to-do');
    document.getElementById('to-do').innerHTML = ``;
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        if (element) {
            document.getElementById('to-do').innerHTML += generateTaskHTML(element);
        }
    }
}


function renderTasksInProgress() {
    let inProgress = tasks.filter(t => t['category'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = ``;
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        if (element) {
            document.getElementById('in-progress').innerHTML += generateTaskHTML(element);
        }
    }
}

function renderTasksAwaitingFeedback() {
    let awaitingFeedback = tasks.filter(t => t['category'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = ``;
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        if (element) {
            document.getElementById('awaiting-feedback').innerHTML += generateTaskHTML(element);
        }
    }
}

function renderTasksDone() {
    let done = tasks.filter(t => t['category'] == 'done');
    document.getElementById('done').innerHTML = ``;
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        if (element) {
            document.getElementById('done').innerHTML += generateTaskHTML(element);
        }
    }
}


/**
 *  This function generates the HTML Code for a Task Card, task variables are given by parent function
 * (Design is not completed yet!!!)
 */
function generateTaskHTML(currentTask) {
    return `
    <div draggable="true" ondragstart="startDragging(${tasks.indexOf(currentTask)})" class="task-card">
        <span class="box-category" style="background-color: ${currentTask['categoryColor']}">${currentTask['categoryType']}</span>
        <h6>${currentTask['title']}</h6>
        <p>${currentTask['description']}</p>
        <div><span>${currentTask['contact']}</span><span>${currentTask['prio']}</span></div>
    </div>
    `;
}

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

function boardOpenAddTask() {
    document.getElementById('board-add-task').classList.remove('d-none');
    document.getElementById('board-content').classList.add('d-none');
}

function boardCloseAddTask() {
    document.getElementById('board-add-task').classList.add('d-none');
    document.getElementById('board-content').classList.remove('d-none');
}
