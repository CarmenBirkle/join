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
    <div class="add-task-dropdown-new-category" onclick="renderNewCategory()">
        <img class="add-task-category-plus" src="./assets/img/icons/add-task-plus-category.svg" alt="plus">
        New Category
    </div>
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
        <input id="new-category-type-name" class="add-task-new-categroy-input" type="text" placeholder="New category name" onkeypress="saveNewCategoryEnter(event)">
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
    <div id="add-task-add-new-contact-section">
        <div class="add-task-dropdown-top" id="add-task-assigendto-dropdown-top" onclick="openAssignedToDropdown()">
            <span>Select contacts to assign</span>
            <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
        </div>
    </div>
    <div id="add-task-assignedto-dropdown" class="add-task-dropdown-open d-none">                          
    </div>
    `;
}

function openTopAssignedToHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top" id="add-task-assigendto-dropdown-top" onclick="openAssignedToDropdown()">
        <span>Select contacts to assign</span>
        <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    </div>
    `;
}

function openAssignedListHTML(name, email, bgColor, initals) {
    return /*html*/`
    <div style="justify-content: space-between;" class="add-task-dropdown-option"  onclick="toggleCheckboxAssigned(event,'${bgColor}','${initals}')">
        ${name}
        <input type="checkbox" name="${email}" value="${name}" class="validate-assignedto-checkbox">
    </div>
     `;
}

function openInviteNewContactHTML() {
    return /*html*/`
    <div class="add-task-dropdown-new-contact" onclick="renderAssignedToNewContact()">
        Invite new Contact
        <img src="./assets/img/icons/add-task-new-contact.svg" alt="contact">
    </div>
    `;
}

function openNewContactSelectHTML() {
    return /*html*/`
    <div class="add-task-dropdown-top">
        <input id="assigned-new-contact-input" class="add-task-new-contact-input" type="email" placeholder="Contact email" onkeypress="searchNewContactEnter(event)">
        <div class="add-task-new-categroy-buttons">
            <img src="./assets/img/icons/add-task-button-cross.svg" onclick="renderTopAssigendToAfterNewContact()" alt="cross">
            <div class="add-task-category-greyline"></div>
            <img src="./assets/img/icons/add-task-button-check.svg" onclick="searchNewContact()" alt="check">
        </div>
    </div>
    `;
}

function openrenderAssignedUser(bgColor, initals) {
    return`
    <div style="background: rgb(${bgColor});" class="add-task-assigned-user">
        <div>${initals}</div>
    </div>
    `;
}

/*-- Due Date Template-HTML --*/
function renderDueDate(today) {
    return /*html*/`
    <label for="add-task-input-due-date">Due date</label>
    <input style="font-family: Inter, sans-serif;" id="add-task-input-due-date" type="date" min="${today}" required>
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
        <input id="add-task-subtask-input" type="text" placeholder="Create new icons" onkeypress="addNewSubtaskEnter(event)">
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
    <div class="add-task-subtask-checkbox-container">
        <input type="checkbox" name="subtasks" value="${subTaskCheckbox}" checked>
        <span>${subTaskCheckbox}</span>
    </div>
    `;
}