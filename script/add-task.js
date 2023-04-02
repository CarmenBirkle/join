const allCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];
let addSubtasks = [];

let chosenCategoryColor = []; // validate form
let chosenCategoryType = []; // validate form
let chosenAssignedTo = []; // validate form
let chosenPrioButton = []; // validate form
let chosenSubtasks = []; // validate form

let tasks = [];


/*-- Init All Elements --*/
function initAddTask() {
    initCategory();
    initAssignedTo();
    initDueDate();
    initPrioButtons();
    initSubtask();
}

/*-- Category --*/
function initCategory() {
    document.getElementById('add-task-category-render').innerHTML = loadCategoryHTML();
    document.getElementById('add-task-new-category-dots').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = '';
}

function openCategoryDropdown() {
    document.getElementById('add-task-category-dropdown').classList.toggle('d-none');
    document.getElementById('add-task-new-category-error').innerHTML = '';
    renderTopCategory();
    renderCategorySelection();
}

function renderTopCategory() {
    document.getElementById('add-task-category-dropdown-top').innerHTML = '';
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopPlaceholderHTML('Select task category');
}

function renderCategorySelection() {
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = openNewCategoryHTML();

    for (let j = 0; j < defaultCategoryColor.length; j++) {
        let color = defaultCategoryColor[j];
        let type = defaultCategoryType[j];

        document.getElementById('add-task-category-dropdown').innerHTML += openCategorysHTML(color, type);
    }
}

function setCategory(color, type) {
    choseCategory(color, type);
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(color, type);
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').classList.add('d-none');
}

function renderNewCategory() {
    document.getElementById('add-task-category-render').innerHTML = '';
    document.getElementById('add-task-category-render').innerHTML = openNewCategorySelectHTML();
    renderNewCategoryDots();
}

function renderNewCategoryDots() {
    document.getElementById('add-task-new-category-dots').innerHTML = '';

    for (let i = 0; i < allCategoryColor.length; i++) {
        let dotColor = allCategoryColor[i];
        document.getElementById('add-task-new-category-dots').innerHTML += openNewCategoryDotsHTML(dotColor, i);
    }
}

/*-- Category add new Category --*/
function saveNewColor(dotColor, d) {
    chosenCategoryColor = [];
    chosenCategoryColor.push(dotColor);
    renderNewCategoryDots();
    document.getElementById(`selected-dot-active${d}`).classList.add('dropdown-option-dots-selected');
}

function saveNewCategory() {
    let newType = document.getElementById('new-category-type-name');

    if (newType.value === '' || chosenCategoryColor.length === 0) {
        renderCategoryError();
    } else {
        defaultCategoryColor = defaultCategoryColor.concat(chosenCategoryColor);
        defaultCategoryType.push(newType.value);
        initCategory();
        openTopSetNewCategory();
        addedNewCategoryMessage();
    }
}

function openTopSetNewCategory() {
    let newColor = defaultCategoryColor[defaultCategoryColor.length - 1];
    let newType = defaultCategoryType[defaultCategoryType.length - 1];

    choseCategory(newColor, newType);
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(newColor, newType);
}

function renderCategoryError() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = addTaskErrorHTML('Please select a category name and pick a color');
}

function addedNewCategoryMessage() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = addTaskErrorHTML('Added new category');
    setTimeout(() => {
        document.getElementById('add-task-new-category-error').innerHTML = '';
    }, 2000)
}

/*-- Assigned-To --*/
function initAssignedTo() {
    document.getElementById('add-task-assignedto-render').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assignedto-render').innerHTML = loadAssignedToHTML();
    renderAssignedToSelection();
}

function openAssignedToDropdown() {
    document.getElementById('add-task-assignedto-dropdown').classList.toggle('d-none');
    renderTopAssigendTo();
}

function renderTopAssigendTo() {
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = openTopPlaceholderHTML('Select contacts to assign');
}


function renderAssignedToSelection() {
    document.getElementById('add-task-assignedto-dropdown').innerHTML = '';

    //TEST
    let names = ['Anna', 'Daniel','Peter'];
    // TEST

    for (let i = 0; i < names.length; i++) {
        let name = names[i];

        document.getElementById('add-task-assignedto-dropdown').innerHTML += openAssignedListHTML(name);
    }
}

function renderAssignedToError() {
    document.getElementById('add-task-assigned-error').innerHTML = '';
    document.getElementById('add-task-assigned-error').innerHTML = addTaskErrorHTML('Please select a Contact');
}


/*-- Due Date --*/
function initDueDate() {
    document.getElementById('add-task-due-date').innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('add-task-due-date').innerHTML = renderDueDate(today);
}


/*-- Prio --*/
function initPrioButtons() {
    const prioButtons = ['urgent', 'medium', 'low'];
    document.getElementById('add-task-priobutton-render').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = '';

    for (let i = 0; i < prioButtons.length; i++) {
        let prioName = prioButtons[i];
        let prioNameFormatted = prioName.charAt(0).toUpperCase() + prioName.slice(1).toLowerCase();
        document.getElementById('add-task-priobutton-render').innerHTML += openPrioButtonsHTML(prioName, prioNameFormatted);
    }
}

function setAddTaskPrioButton(prioId) {
    initPrioButtons();

    chosenPrioButton = [];
    chosenPrioButton.push(prioId);

    setPrioButtonDesign(prioId);
}

function setPrioButtonDesign(prioId) {
    document.getElementById(`${prioId}`).classList.add(`bg-${prioId}`, 'add-task-font-color');
    document.getElementById(`img-${prioId}`).classList.add('d-none');
    document.getElementById(`img-${prioId}-white`).classList.remove('d-none');
}

function renderPrioButtonError() {
    document.getElementById('add-task-prio-button-error').innerHTML = '';
    document.getElementById('add-task-prio-button-error').innerHTML = addTaskErrorHTML('Please select a Priority');
}

/*-- Subtask --*/
function initSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
    document.getElementById('add-task-subtask-error').innerHTML = '';
    document.getElementById('add-task-subtask-render').innerHTML = loadSubtaskHTML();
}

function changeSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
    document.getElementById('add-task-subtask-render').innerHTML = openSubtaskInput();
    document.getElementById('add-task-subtask-input').focus();
}

function addNewSubtask() {
    document.getElementById('add-task-subtask-error').innerHTML = '';
    let subtaskInput = document.getElementById('add-task-subtask-input');
    if (subtaskInput.value === "") {
        document.getElementById('add-task-subtask-error').innerHTML = addTaskErrorHTML('Please write a subtask');
        subtaskInput.focus();
    } else {
        addSubtasks.push(subtaskInput.value);
        subtaskInput.value = "";
        subtaskInput.focus();

        document.getElementById('add-task-subtask-addtask-render').innerHTML = '';
        renderSubtaskCheckbox();
    }
}

function renderSubtaskCheckbox() {
    for (let i = 0; i < addSubtasks.length; i++) {
        let subTaskCheckbox = addSubtasks[i];
        document.getElementById('add-task-subtask-addtask-render').innerHTML += openSubtasksCheckboxHTML(subTaskCheckbox);
    }
}

/*-- Clear Button --*/
function clearAddTask() {
    chosenCategoryColor = [];
    chosenCategoryType = [];
    chosenAssignedTo = [];
    chosenPrioButton = [];
    chosenSubtasks = [];
    addSubtasks = [];
    document.getElementById('add-task-subtask-addtask-render').innerHTML = '';

    initAddTask();
}

/*-- Form / Create Button --*/
function choseCategory(color, type) {
    chosenCategoryColor = [];
    chosenCategoryType = [];

    chosenCategoryColor.push(color);
    chosenCategoryType.push(type);
}

function validateForm() {
    if (chosenCategoryType.length === 0 || chosenCategoryColor.length === 0) {
        renderCategoryError();
        return;
    } if (chosenPrioButton.length === 0) {
        renderPrioButtonError();
        return;
    }
    pushChosenAssignedTo();
    if(chosenAssignedTo.length === 0) {
        renderAssignedToError();
        return;
    }
    pushChosenSubtasks(); // not a required field
    sendFormToBackend();
}

function pushChosenAssignedTo() {
    let contactsCheckboxes = document.querySelectorAll('input[name=contacts]');
    for(let i = 0; i < contactsCheckboxes.length; i++) {
        if(contactsCheckboxes[i].checked) {
            chosenAssignedTo.push(contactsCheckboxes[i].value);
        }
    }
}

function pushChosenSubtasks() {
    let subtaskCheckboxes = document.querySelectorAll('input[name=subtasks]');
    for(let i = 0; i < subtaskCheckboxes.length; i++) {
        if(subtaskCheckboxes[i].checked) {
            chosenSubtasks.push(subtaskCheckboxes[i].value);
        }
    }
}

async function sendFormToBackend() {
    try {
        const button = document.getElementById('add-task-create-button');
        const buttonMedia = document.getElementById('add-task-create-button-media');
        button.disabled = true;
        buttonMedia.disabled = true;

        let title = document.getElementById('add-task-input-title').value;
        let description = document.getElementById('add-task-input-description').value;
        let categoryColor = chosenCategoryColor[0];
        let categoryType = chosenCategoryType[0];
        let contact = chosenAssignedTo;
        let date = document.getElementById('add-task-input-due-date').value;
        let prio = chosenPrioButton[0];
        let subtask = chosenSubtasks;
        
        let task = {
            'number': tasks.length +1,
            'title': title,
            'description': description,
            'categoryColor': categoryColor,
            'categoryType': categoryType,
            'contact': contact,
            'date': date,
            'prio': prio,
            'subtask': subtask
        }

        tasks.push(task);
        console.log('SEND'); // TEST
        console.log(tasks); // TEST

        let clearButton = document.getElementById('add-task-clear-button');
        clearButton.click();
    } catch {
        console.log('ERROR');
    } finally {
        const button = document.getElementById('add-task-create-button');
        const buttonMedia = document.getElementById('add-task-create-button-media');
        button.disabled = false;
        buttonMedia.disabled = false;
    }
}


/*-- Template-HTML --*/
/*-- Error-HTML --*/
function addTaskErrorHTML(error) {
    return /*html*/ `
    <span class="add-task-error-message">${error}</span>
    `;
}

/*-- Category and AssignedTo Template-HTML --*/
function openTopPlaceholderHTML(placeholder) {
    return /*html*/`
    <span>${placeholder}</span>
    <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    `;
}

/*-- Category Template-HTML --*/
function loadCategoryHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top" id="add-task-category-dropdown-top" onclick="openCategoryDropdown()">
        <span>Select task category</span>
        <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    </div>
    <div id="add-task-category-dropdown" class="add-task-dropdown-open d-none">                          
     </div>
    `;
}

function openNewCategoryHTML() {
    return /*html*/`
    <span class="add-task-dropdown-new-category" onclick="renderNewCategory()">New Category</span>
    `;
}

function openCategorysHTML(color, type) {
    return /*html*/`
    <div class="add-task-dropdown-option" onclick="setCategory('${color}', '${type}')">
        <span>${type}</span>
        <div class="dropdown-option-dots" style="background-color: ${color};"></div>
    </div>
     `;
}

function openTopSetCategoryHTML(color, type) {
    return /*html*/`
    <div>
        <span>${type}</span>
        <div class="dropdown-option-dots" style="background-color: ${color};"></div>
    </div>
    <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
     `;
}

function openNewCategorySelectHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top">
        <input id="new-category-type-name" class="add-task-new-categroy-input" type="text" placeholder="New category name">
        <div class="add-task-new-categroy-buttons">
            <img src="./assets/img/icons/add-task-button-cross.svg" onclick="initCategory()" alt="cross">
            <div class="add-task-category-greyline"></div>
            <img src="./assets/img/icons/add-task-button-check.svg" onclick="saveNewCategory()" alt="check">
        </div>
    </div>
    `;
}

function openNewCategoryDotsHTML(dotColor, i) {
    return /*html*/`
    <div id="selected-dot-active${i}" class="dropdown-option-dots new-category-dot" style="background-color: ${dotColor};" onclick="saveNewColor('${dotColor}', '${i}')"></div>
    `;
}

/*-- Assigned to Template-HTML --*/
function loadAssignedToHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top" id="add-task-assigendto-dropdown-top" onclick="openAssignedToDropdown()">
        <span>Select contacts to assign</span>
        <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    </div>
    <div id="add-task-assignedto-dropdown" class="add-task-dropdown-open d-none">                          
     </div>
    `;
}

function openAssignedListHTML(name) {
    return /*html*/`
    <div style="justify-content: space-between;" class="add-task-dropdown-option">
        <span>${name}</span>
        <input type="checkbox" name="contacts" value="${name}">
    </div>
     `;
}

/*-- Due Date Template-HTML --*/
function renderDueDate(today) {
    return /*html*/`
    <label for="add-task-input-due-date">Due date</label>
    <input id="add-task-input-due-date" type="date" min="${today}" required>
    `;
}

/*-- Prio-Buttons-HTML --*/
function openPrioButtonsHTML(prioName, prioNameFormatted) {
    return /*html*/`
    <button type="button" id="prio-${prioName}" onclick="setAddTaskPrioButton('prio-${prioName}')">
        ${prioNameFormatted}
        <img id="img-prio-${prioName}" src="./assets/img/icons/add-task-${prioName}.svg" alt="${prioName}">
        <img id="img-prio-${prioName}-white" class="d-none" src="./assets/img/icons/add-task-${prioName}-white.svg" alt="${prioName}">
    </button>
    `;
}

/*-- Subtasks Template-HTML --*/
function loadSubtaskHTML() {
    return /*html*/`
    <div class="add-task-subtask-main-placeholder" onclick="changeSubtask()">
        <input type="text" placeholder="Add new subtask">
        <img src="./assets/img/icons/add-task-subtask-plus.svg" alt="plus">
    </div>
    `;
}

function openSubtaskInput() {
    return /*html*/`
    <div class="add-task-subtask-main-placeholder">
        <input id="add-task-subtask-input" type="text" placeholder="Create new icons">
        <div class="add-task-new-subtask-buttons">
            <img src="./assets/img/icons/add-task-button-cross.svg" onclick="initSubtask()" alt="cross">
            <div class="add-task-category-greyline"></div>
            <img src="./assets/img/icons/add-task-button-check.svg" onclick="addNewSubtask()" alt="check">
        </div>
    </div>
    `;
}

function openSubtasksCheckboxHTML(subTaskCheckbox) {
    return /*html*/`
    <div>
        <input type="checkbox" name="subtasks" value="${subTaskCheckbox}" checked>
        <span>${subTaskCheckbox}</span>
    </div>
    `;
}
