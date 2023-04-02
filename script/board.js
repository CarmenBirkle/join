/**
 * This function renders the Tasks on the board
 */

function renderTasks() {
    let toDo = users[0]['tasks'].filter(t => t['category'] == 'to-do');
    document.getElementById('to-do').innerHTML = ``;
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        if (element) {
        document.getElementById('to-do').innerHTML += generateTaskHTML(element);
        }
    };
    let inProgress = users[0]['tasks'].filter(t => t['category'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = ``;
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        if (element) {
        document.getElementById('in-progress').innerHTML += generateTaskHTML(element);
        }
    };
    let awaitingFeedback = users[0]['tasks'].filter(t => t['category'] == 'awaiting-feedback');
    document.getElementById('awaiting-feedback').innerHTML = ``;
    for (let index = 0; index < awaitingFeedback.length; index++) {
        const element = awaitingFeedback[index];
        if (element) {
            document.getElementById('awaiting-feedback').innerHTML += generateTaskHTML(element);
        }
    };
    let done = users[0]['tasks'].filter(t => t['category'] == 'done');
    document.getElementById('done').innerHTML = ``;
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        if (element) {
        document.getElementById('done').innerHTML += generateTaskHTML(element);
        }
    };
}
/**
 *  This function generates the HTML Code for a Task Card, task variables are given by parent function
 * (Design is not completed yet!!!)
 */
function generateTaskHTML(task) {
    return `
    <div class="task-card">
        <span class="box-category" style="background-color: ${task['categoryColor']}">${task['categoryType']}</span>
        <h6>${task['title']}</h6>
        <p>${task['description']}</p>
        <div><span>${task['contact']}</span><span>${task['prio']}</span></div>
    </div>
    `;
}