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
    <div id="board-task-${tasks.indexOf(currentTask)}" draggable="true" onclick="boardShowTask(${tasks.indexOf(currentTask)})" ondragstart="startDragging(${tasks.indexOf(currentTask)})" class="task-card">
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
    if (currentTask['prio'] == 'urgent') {
        prioIcon.setAttribute("src", "./assets/img/icons/add-task-urgent.svg");
    };
    if (currentTask['prio'] == 'medium') {
        prioIcon.setAttribute("src", "./assets/img/icons/add-task-medium.svg");
    };
    if (currentTask['prio'] == 'low') {
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
    furtherFunctionsToValidate(category);
}

async function furtherFunctionsToValidate(category) {
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

function boardShowTask(currentTaskIndex) {
    document.getElementById('board-open-task').classList.remove('d-none');
    document.getElementById('board-open-task').innerHTML = generateBoardOpenTaskHTML(currentTaskIndex);
    generatePrioInOpenTaskHTML(currentTaskIndex);
    generateContactsInOpenTaskHTML(currentTaskIndex);
}

/**
 * This function writes the HTML code into a new opened task
 */

function generateBoardOpenTaskHTML(currentTaskIndex) {
    let currentTask = tasks[currentTaskIndex];
    let dueDate = new Date(currentTask['date']);
    return `
    <div onclick="doNotClose(event)" class="open-task-card">
        <img class="board-close-button" src="./assets/img/icons/board-task-close.svg" 
        onclick="closeOpenTaskPopup()">
        <span class="box-category" style="background-color: ${currentTask['categoryColor']}">
        ${currentTask['categoryType']}</span>
        <h1>${currentTask['title']}</h1>
        <p>${currentTask['description']}</p>
        <p><b>Due date:</b><span style="margin-left: 25px">
        ${dueDate.getDate().toString().padStart(2, 0)}-${dueDate.getMonth().toString().padStart(2, 0)}-${dueDate.getFullYear()}</span></p>
        <div style="display: flex; align-items: center"><span><b>Priority:</b></span>
        <div class="board-prio-button" id="open-task-priority"></div></div>
        <p><b>Assigned to:</b></p>
        <div id="open-task-contacts"></div>
        <div class="board-edit-button" onclick="openSecondTaskPage(${currentTaskIndex})"><img style="object-fit: contain; 
        color: white" src="./assets/img/icons/board-edit-button-white.svg"></div>
    </div>
    `;
}

/**
 * This function generates the Priority section in the opened task
 */

function generatePrioInOpenTaskHTML(currentTaskIndex) {
    if (tasks[currentTaskIndex]['prio'] == 'urgent') {
        document.getElementById(`open-task-priority`).innerHTML = `Urgent<img class="board-prio-img" id="open-task-priority-img">`;
        document.getElementById(`open-task-priority`).setAttribute("style", "background-color: #FF3D00");
        document.getElementById('open-task-priority-img').setAttribute("src", "./assets/img/icons/add-task-urgent-white.svg");
    };
    if (tasks[currentTaskIndex]['prio'] == 'medium') {
        document.getElementById(`open-task-priority`).innerHTML = `Medium<img class="board-prio-img" id="open-task-priority-img">`;
        document.getElementById(`open-task-priority`).setAttribute("style", "background-color: #FFA800");
        document.getElementById('open-task-priority-img').setAttribute("src", "./assets/img/icons/add-task-medium-white.svg");
    };
    if (tasks[currentTaskIndex]['prio'] == 'low') {
        document.getElementById(`open-task-priority`).innerHTML = `Low<img class="board-prio-img" id="open-task-priority-img">`;
        document.getElementById(`open-task-priority`).setAttribute("style", "background-color: #7AE229");
        document.getElementById('open-task-priority-img').setAttribute("src", "./assets/img/icons/add-task-low-white.svg");
    }
}

/**
 * This function generates the Contacts section in the opned task
 */

function generateContactsInOpenTaskHTML(currentTaskIndex) {
    document.getElementById('open-task-contacts').innerHTML = ``;
    currentContacts = [];
    for (let index = 0; index < tasks[currentTaskIndex]['contact'].length; index++) {
        const currentContact = tasks[currentTaskIndex]['contact'][index];
        let currentContactFromBackend = contacts.filter(c => c['fullname'] == currentContact);
        currentContacts.push(currentContactFromBackend);
    }
    for (let j = 0; j < currentContacts.length; j++) {
        const element = currentContacts[j][0];
        document.getElementById('open-task-contacts').innerHTML += `
            <div style="display: flex; align-items: center; gap: 25px; margin-bottom: 25px"><div style="color: white; 
            background-color:rgb(${element['bgcolor']}); border-radius: 100%; padding: 10px">${element['initals']}</div>
            <span>${element['fullname']}</span></div>
            `;
    }
}

/**
 *  This function closes a opened task
 */

function closeOpenTaskPopup() {
    document.getElementById('board-open-task').classList.add('d-none');
}

/**
 *  This function closes a opened Add Task Popup
 */

function closeAddTaskPopup() {
    document.getElementById('board-add-task').classList.add('d-none');
    window.location.reload();
}



function openSecondTaskPage(currentTaskIndex) {
    document.getElementById('board-open-task').innerHTML = ``;
    document.getElementById('board-open-task').innerHTML = generateSecondTaskPageHTML(currentTaskIndex);
    initChangeDueDate(currentTaskIndex);
    initChangePrioButtons();
    setChangePrioButtonDesign(tasks[currentTaskIndex]['prio']);
    pushAlreadySelectedContacts();
    initChangeAssignedTo();
    renderChangeAssignedUsers();
}

function generateSecondTaskPageHTML(currentTaskIndex) {
    return `
    <div onclick="doNotClose(event)" class="open-task-card">
    <img class="board-close-button" src="./assets/img/icons/board-task-close.svg" 
    onclick="closeOpenTaskPopup()">
    <form  class="input-bar" onsubmit="saveChangedTask(${tasks[currentTaskIndex]}); return false" autocomplete="on">
    <div class="add-task-title">
        <label for="add-task-input-title">Title</label>
        <input id="change-task-input-title" type="text" placeholder="Title" value="${tasks[currentTaskIndex]['title']}" required>
    </div>

    <div class="add-task-description">
        <label for="change-task-input-description">Description</label>
        <textarea style="font-family: Inter, sans-serif;" id="change-task-input-description"
        placeholder="Description" required>${tasks[currentTaskIndex]['description']}</textarea>
    </div>

    <div class="add-task-due-date" id="change-task-due-date">
    <label>Due date</label>
    </div>

    <div class="add-task-prio">
        <label>Prio</label>
        <div class="add-task-prio-button-container" id="change-task-prio-button-render"></div>
        <span id="change-task-prio-button-error"></span>
    </div>

    <div class="add-task-assigned">
    <label>Assigned to</label>
    <div class="add-task-assigned-dropdown" id="change-task-assignedto-render"></div>
    <span id="change-task-assigned-error"></span>
    <div class="add-task-assigned-users-main" id="change-task-assigned-users"></div>
    </div>

    <button type="submit" class="board-edit-button"">OK<img style="object-fit: contain; 
    color: white; margin-left: 10px" src="./assets/img/icons/board-ok-white.svg"></button>
    </div>
    </form>
    `;
}


/*-- Due Date --*/
/**
 * Generate the due-date input field from the add-task-template.js.
 * min date = current date
 */
function initChangeDueDate(currentTaskIndex) {
    document.getElementById('change-task-due-date').innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('change-task-due-date').innerHTML = loadChangeDueDateHTML(today, currentTaskIndex);
}

/*-- Due Date Template-HTML --*/
function loadChangeDueDateHTML(today, currentTaskIndex) {
    let currentTask = tasks[currentTaskIndex];
    let dueDate = new Date(currentTask['date']);
    return /*html*/`
    <label for="change-task-input-due-date">Due date</label>
    <input style="font-family: Inter, sans-serif;" value="${dueDate.getFullYear()}-${dueDate.getMonth().toString().padStart(2, 0)}-${dueDate.getDate().toString().padStart(2, 0)}" id="change-task-input-due-date" type="date" min="${today}" required>
    `;
}


/*-- Prio --*/
/**
 * Generate the prio buttons from array prioButtons.
 * 
 */
function initChangePrioButtons() {
    const prioButtons = ['urgent', 'medium', 'low'];
    document.getElementById('change-task-prio-button-render').innerHTML = '';
    document.getElementById('change-task-prio-button-error').innerHTML = '';

    for (let i = 0; i < prioButtons.length; i++) {
        let prioName = prioButtons[i];
        let prioNameFormatted = prioName.charAt(0).toUpperCase() + prioName.slice(1).toLowerCase();
        document.getElementById('change-task-prio-button-render').innerHTML += loadChangePrioButtonsHTML(prioName, prioNameFormatted);
    }
}

/*-- Prio-Buttons-HTML --*/
function loadChangePrioButtonsHTML(prioName, prioNameFormatted) {
    return /*html*/`
    <button type="button" id="change-prio-${prioName}" onclick="setChangeAddTaskPrioButton('${prioName}')">
        ${prioNameFormatted}
        <img id="change-img-prio-${prioName}" src="./assets/img/icons/add-task-${prioName}.svg" alt="${prioName}">
        <img id="change-img-prio-${prioName}-white" class="d-none" src="./assets/img/icons/add-task-${prioName}-white.svg" alt="${prioName}">
    </button>
    `;
}

/**
 * Save the selected prio button id by pushing the id into the chosenPrioButton array. (validate form)
 * @param {String} prioId - (Id) from prio button (urgent, medium, low).
 */
function setChangeAddTaskPrioButton(prioId) {
    initChangePrioButtons();

    chosenPrioButton = [];
    chosenPrioButton.push(prioId);

    setChangePrioButtonDesign(prioId);
}

/**
 * Generate a new design for the selected prio button.
 * @param {String} prioId - (Id) from prio button (urgent, medium, low).
 */
function setChangePrioButtonDesign(prioId) {
    document.getElementById(`change-prio-${prioId}`).classList.add(`bg-prio-${prioId}`, 'add-task-font-color');
    document.getElementById(`change-img-prio-${prioId}`).classList.add('d-none');
    document.getElementById(`change-img-prio-${prioId}-white`).classList.remove('d-none');
}

/**
 * Shows an error if no prio button was selected. (form validation)
 * 
 */
function renderChangePrioButtonError() {
    document.getElementById('add-task-prio-button-error').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = addTaskErrorHTML('Please select a Priority');
}










/*-- Assigned-To --*/
/**
 * Generate the loadAssignedToHTML from the add-task-template.js.
 * Executes the functions that renders the names and the new-contact field.
 */
function initChangeAssignedTo() {
    document.getElementById('change-task-assignedto-render').innerHTML = '';
    document.getElementById('change-task-assigned-error').innerHTML = '';
    document.getElementById('change-task-assignedto-render').innerHTML = loadChangeAssignedToHTML();
    renderChangeAssignedToSelection();
    renderChangeInviteNewContact();
}

/**
 * Open the dropdown form the assigned to section.
 * 
 */
function openChangeAssignedToDropdown() {
    document.getElementById('change-task-assignedto-dropdown').classList.toggle('d-none');
    renderChangeTopAssigendTo();
}

/**
 * Render the top section from the Assigned to and open the placeholder.
 * 
 */
function renderChangeTopAssigendTo() {
    document.getElementById('change-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('change-task-assigned-error').innerHTML = '';
    document.getElementById('change-task-assigendto-dropdown-top').innerHTML = openTopPlaceholderHTML('Select contacts to assign');
}

/**
 * Render the new-contact field.
 * 
 */
function renderChangeInviteNewContact() {
    document.getElementById('change-task-assignedto-dropdown').innerHTML += openChangeInviteNewContactHTML();
}

/**
 * Render the fullname / email / bgColor / initals from the contacts (backend).
 * The fullname will be show in the dropdown assigned section.
 */
function renderChangeAssignedToSelection() {
    document.getElementById('change-task-assignedto-dropdown').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const name = contacts[i].fullname;
        const email = contacts[i].email;
        const bgColor = contacts[i].bgcolor;
        const initals = contacts[i].initals;
        document.getElementById('change-task-assignedto-dropdown').innerHTML += openChangeAssignedListHTML(name, email, bgColor, initals);
    }
}

/**
 * Render the input field from the new-contact that allows searching by email.
 * 
 */
function renderChangeAssignedToNewContact() {
    document.getElementById('change-task-assignedto-dropdown').classList.toggle('d-none');
    document.getElementById('change-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('change-task-add-new-contact-section').innerHTML = openChangeNewContactSelectHTML();
}

/**
 * Handles the keydown event for the "Serach New Contact" input field. 
 * @param {event} event - This parameter is used to detect if the user has pressed the "Enter" key, and if so,
 *                      to prevent the default form submission behavior.
 */
function searchChangeNewContactEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        searchChangeNewContact();
    }
}

/**
 * Searches the dropdown section for the entered email(assigned-new-contact-input).
 * Validate the value from the assigned-new-contact-input.
 */
function searchChangeNewContact() {
    let emailInput = document.getElementById('change-assigned-new-contact-input').value;
    let checkEmail = document.querySelector(`input[type="checkbox"][name="${emailInput}"]`);
    if (checkEmail) {
        checkEmail.checked = true;
        renderChangeTopAssigendToAfterNewContact();
        searchChangeNewContactPushUser(emailInput);
        renderChangeAssignedUsers();
    } else {
        document.getElementById('change-task-assigned-error').innerHTML = addTaskErrorHTML(`${emailInput} email not found!`);
        document.getElementById('change-assigned-new-contact-input').focus();
    }
    setTimeout(() => {
        document.getElementById('change-task-assigned-error').innerHTML = '';
    }, 2000);
}

/**
 * If you click on the cross, the assigned-new-contact-input will be closed.
 * 
 */
function renderChangeTopAssigendToAfterNewContact() {
    document.getElementById('change-task-add-new-contact-section').innerHTML = '';
    document.getElementById('change-task-add-new-contact-section').innerHTML = openChangeTopAssignedToHTML();
}

/**
 * Searches for a contact in the `contacts` array with the specified email address and 
 * pushes the contact's initials and bgColor into the `assignedToUsers` array, if not already present.
 * @param {String} emailInput - the value form the assigned-new-contact input field.
 */
function searchChangeNewContactPushUser(emailInput) {
    const selectedContact = contacts.find(contact => contact.email === emailInput);
    let bgcolor = selectedContact.bgcolor;
    let initals = selectedContact.initals;
    let index = assignedToUsers.findIndex(userInfo => userInfo.bgcolor === bgcolor && userInfo.initals === initals);
    // prevent multi generate
    if (index === -1) {
        assignedToUsers.push({ bgcolor: bgColor, initals: initals });
    }
}

/**
 * Toggles the checkbox state of the assigned-to user and 
 * updates the assignedToUsers array with the user's background color and initials.
 * @param {event} event - The event object.
 * @param {String} bgcolor - The background color of the user in the contacts array as rgb.
 * @param {String} initals - The initials of the user in the contacts array.
 */
function toggleChangeCheckboxAssigned(event, bgcolor, initals) {
    let divContainerAssigned = event.target.closest('.add-task-dropdown-option');
    let checkboxAssigned = divContainerAssigned.querySelector('.validate-assignedto-checkbox');

    if (divContainerAssigned === event.target) {
        checkboxAssigned.checked = !checkboxAssigned.checked;
    }

    updateChangeAssignedToUsers(checkboxAssigned, bgcolor, initals);
    renderChangeAssignedUsers();
}

/**
 * Updates the assignedToUsers array based on the checkbox state of the assigned user.
 * @param {Object} checkboxAssigned - The HTML checkbox element representing the assigned user.
 * @param {String} bgcolor - The background color of the user in the contacts array as rgb.
 * @param {String} initals - The initials of the user in the contacts array.
 */
function updateChangeAssignedToUsers(checkboxAssigned, bgcolor, initals) {
    let index = assignedToUsers.findIndex(userInfo => userInfo.bgcolor === bgcolor && userInfo.initals === initals);
    // prevent multi generate
    if (checkboxAssigned.checked) {
        if (index === -1) {
            assignedToUsers.push({ bgcolor: bgcolor, initals: initals });
        }
    } else {
        if (index !== -1) {
            assignedToUsers.splice(index, 1);
        }
    }
}


/**
 * Render the user icons, after selected them.
 * 
 */
function renderChangeAssignedUsers() {
    document.getElementById('change-task-assigned-users').innerHTML = '';
    for (let i = 0; i < assignedToUsers.length; i++) {
        let bgcolor = assignedToUsers[i].bgcolor;
        let initals = assignedToUsers[i].initals;
        document.getElementById('change-task-assigned-users').innerHTML += openChangeAssignedUserHTML(bgcolor, initals);
    }
}

/**
 * Shows an error if no user was selected. (form validation)
 * 
 */
function renderChangeAssignedToError() {
    document.getElementById('change-task-assigned-error').innerHTML = '';
    document.getElementById('change-task-assigned-error').innerHTML = addTaskErrorHTML('Please select a Contact');
}


/*-- Assigned to Template-HTML --*/
function loadChangeAssignedToHTML() {
    return /*html*/`
    <div id="change-task-add-new-contact-section">
        <div class="add-task-dropdown-top" id="change-task-assigendto-dropdown-top" onclick="openChangeAssignedToDropdown()">
            <span>Select contacts to assign</span>
            <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
        </div>
    </div>
    <div id="change-task-assignedto-dropdown" class="add-task-dropdown-open d-none">                          
    </div>
    `;
}

function openChangeTopAssignedToHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top" id="change-task-assigendto-dropdown-top" onclick="openChangeAssignedToDropdown()">
        <span>Select contacts to assign</span>
        <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    </div>
    `;
}

function openChangeAssignedListHTML(name, email, bgcolor, initals) {
    return /*html*/`
    <div style="justify-content: space-between;" class="add-task-dropdown-option"  onclick="toggleChangeCheckboxAssigned(event,'${bgcolor}','${initals}')">
        ${name}
        <input type="checkbox" name="${email}" value="${name}" class="validate-assignedto-checkbox">
    </div>
     `;
}

function openChangeInviteNewContactHTML() {
    return /*html*/`
    <div class="add-task-dropdown-new-contact" onclick="renderChangeAssignedToNewContact()">
        Invite new Contact
        <img src="./assets/img/icons/add-task-new-contact.svg" alt="contact">
    </div>
    `;
}

function openChangeNewContactSelectHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top">
        <input id="chnge-assigned-new-contact-input" class="add-task-new-contact-input" type="email" placeholder="Contact email" onkeypress="searchChangeNewContactEnter(event)">
        <div class="add-task-new-categroy-buttons">
            <img src="./assets/img/icons/add-task-button-cross.svg" onclick="renderChangeTopAssigendToAfterNewContact()" alt="cross">
            <div class="add-task-category-greyline"></div>
            <img src="./assets/img/icons/add-task-button-check.svg" onclick="searchChangeNewContact()" alt="check">
        </div>
    </div>
    `;
}

function openChangeAssignedUserHTML(bgcolor, initals) {
    return`
    <div style="background: rgb(${bgcolor});" class="add-task-assigned-user">
        <div>${initals}</div>
    </div>
    `;
}

function saveChangedTask(currentTask){
    pushChangeTaskIntoBackend(currentTask);
    location.reload();
    return false;
}

function pushAlreadySelectedContacts(){
    for (let j = 0; j < currentContacts.length; j++) {
        const element = currentContacts[j][0];
        assignedToUsers.push(element);
    }
    
}

async function pushChangeTaskIntoBackend(currentTask) {
    currentTask['title'] = document.getElementById('change-task-input-title').value;
    currentTask['description'] = document.getElementById('change-task-input-description').value;
    currentTask['date'] = document.getElementById('change-task-input-due-date').value;
    currentTask['prio'] = chosenPrioButton;
    currentTask['contact'] = assignedToUsers;
    await backend.setItem('tasks', JSON.stringify(tasks));
}

