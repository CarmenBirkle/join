const allCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];
let selectedColorNewCategory = [];
let prioButton = [];


/*-- Category --*/
function initCategory() {
    document.getElementById('add-task-category-render').innerHTML = loadCategoryHTML();
    document.getElementById('add-task-new-category-dots').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = '';
}

function openCategoryDropdown() {
    document.getElementById('add-task-category-dropdown').classList.toggle('d-none');
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
        addedNewCategoryMessage();
    }
}

function openTopSetNewCategory() { // TEST NOCH NICHT IN BENUTZUNG !!!!!!!!!!!!!!!!!!!!!!!!
    let newColor = defaultCategoryColor[defaultCategoryColor.length -1];
    let newType = defaultCategoryType[defaultCategoryType.length -1];
    document.getElementById('add-task-new-category-dots').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').classList.add('d-none');

    openTopSetCategoryHTML(newColor, newType);
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

/*-- Prio --*/
function addTaskPrioButton(prioId) {
    // initPrioButton() ???
    prioButton = [];
    prioButton.push(prioId);

    document.getElementById(`${prioId}`).classList.add(`bg-${prioId}`,'add-task-font-color');
    document.getElementById(`img-${prioId}`).classList.add('d-none');
    document.getElementById(`img-${prioId}-white`).classList.remove('d-none')
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