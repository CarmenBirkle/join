const allCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];
let selectedColorNewCategory = [];
let prioButtonSet = [];
let addSubtasks = [];


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

    for (let d = 0; d < allCategoryColor.length; d++) {
        let dotColor = allCategoryColor[d];
        document.getElementById('add-task-new-category-dots').innerHTML += openNewCategoryDotsHTML(dotColor, d);
    }
}

/*-- Category add new Category --*/
function saveNewColor(dotColor, d) {
    selectedColorNewCategory = [];
    renderNewCategoryDots();
    selectedColorNewCategory.push(dotColor);
    document.getElementById(`selected-dot-active${d}`).classList.add('dropdown-option-dots-selected');
}

function saveNewCategory() {
    let newType = document.getElementById('new-category-type-name');

    if (newType.value == '' || selectedColorNewCategory.length == 0) {
        renderNewCategoryError();
    } else {
        defaultCategoryColor = defaultCategoryColor.concat(selectedColorNewCategory);
        defaultCategoryType.push(newType.value);
        initCategory();
        openTopSetNewCategory();
        addedNewCategoryMessage();
    }
}

function openTopSetNewCategory() {
    let newColor = defaultCategoryColor[defaultCategoryColor.length - 1];
    let newType = defaultCategoryType[defaultCategoryType.length - 1];

    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopSetCategoryHTML(newColor, newType);
}

function renderNewCategoryError() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = newCategoryErrorHTML();
}

function addedNewCategoryMessage() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = newCategoryAddedHTML();
    setTimeout(() => {
        document.getElementById('add-task-new-category-error').innerHTML = '';
    }, 2000)
}

/*-- Assigned-To --*/
function initAssignedTo() {
    document.getElementById('add-task-assignedto-render').innerHTML = '';
    document.getElementById('add-task-assignedto-render').innerHTML = loadAssignedToHTML();
}

function openAssignedToDropdown() {
    document.getElementById('add-task-assignedto-dropdown').classList.toggle('d-none');
    renderTopAssigendTo();
    //renderAssignedToSelection();
}

function renderTopAssigendTo() {
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = '';
    document.getElementById('add-task-assigendto-dropdown-top').innerHTML = openTopPlaceholderHTML('Select contacts to assign');
}
/*
function renderAssignedToSelection() {
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = openNewCategoryHTML();

    for (let j = 0; j < defaultCategoryColor.length; j++) {
        let color = defaultCategoryColor[j];
        let type = defaultCategoryType[j];

        document.getElementById('add-task-category-dropdown').innerHTML += openCategorysHTML(color, type);
    }
}
*/

/*-- Due Date --*/
function initDueDate() {
    document.getElementById('add-task-due-date').innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('add-task-due-date').innerHTML = renderDueDate(today);
}


/*-- Prio --*/
function initPrioButtons() {
    const prioButtons = ['urgent', 'medium', 'low'];

    for (let i = 0; i < prioButtons.length; i++) {
        let prioName = prioButtons[i];
        let prioNameFormatted = prioName.charAt(0).toUpperCase() + prioName.slice(1).toLowerCase();
        document.getElementById('add-task-priobutton-render').innerHTML += openPrioButtonsHTML(prioName, prioNameFormatted);
    }
}

function setAddTaskPrioButton(prioId) {
    document.getElementById('add-task-priobutton-render').innerHTML = '';
    initPrioButtons();

    prioButtonSet = [];
    prioButtonSet.push(prioId);

    setPrioButtonDesign(prioId);
}

function setPrioButtonDesign(prioId) {
    document.getElementById(`${prioId}`).classList.add(`bg-${prioId}`, 'add-task-font-color');
    document.getElementById(`img-${prioId}`).classList.add('d-none');
    document.getElementById(`img-${prioId}-white`).classList.remove('d-none');
}

/*-- Subtask --*/
function initSubtask() {
    document.getElementById('add-task-subtask-render').innerHTML = '';
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
        document.getElementById('add-task-subtask-error').innerHTML = subtaskErrorHTML();
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

/*-- Clear / Create Button --*/
function clearAddTask() {
    selectedColorNewCategory = []; // nicht entfernen??????
    prioButtonSet = [];
    document.getElementById('add-task-priobutton-render').innerHTML = '';
    addSubtasks = [];
    document.getElementById('add-task-subtask-addtask-render').innerHTML = '';

    initAddTask();
}



/*-- Template-HTML --*/
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
    <div id="add-task-category-dropdown" class="add-task-category-dropdown-open d-none">                          
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

function openNewCategoryDotsHTML(dotColor, d) {
    return /*html*/`
    <div id="selected-dot-active${d}" class="dropdown-option-dots new-category-dot" style="background-color: ${dotColor};" onclick="saveNewColor('${dotColor}', '${d}')"></div>
    `;
}

function newCategoryErrorHTML() {
    return /*html*/ `
    <span class="new-category-error">Please write a category name and pick a color</span>
    `;
}

function newCategoryAddedHTML() {
    return /*html*/ `
    <span class="new-category-error">Added new category</span>
    `;
}

/*-- Assigned to Template-HTML --*/
function loadAssignedToHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top" id="add-task-assigendto-dropdown-top" onclick="openAssignedToDropdown()">
        <span>Select contacts to assign</span>
        <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    </div>
    <div id="add-task-assignedto-dropdown" class="add-task-category-dropdown-open d-none">                          
     </div>
    `;
}

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

function subtaskErrorHTML() {
    return /*html*/ `
    <span class="new-category-error">Please write a subtask</span>
    `;
}