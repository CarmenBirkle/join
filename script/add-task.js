const allCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF', '#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];
let selectedColorNewCategory = [];


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
    document.getElementById('add-task-category-dropdown-top').innerHTML = openTopCategoryPlaceholderHTML();
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
    renderNewCategoryError();
}

function renderNewCategoryDots() {
    document.getElementById('add-task-new-category-dots').innerHTML = '';

    for (let d = 0; d < allCategoryColor.length; d++) {
        let dotColor = allCategoryColor[d];
        document.getElementById('add-task-new-category-dots').innerHTML += openNewCategoryDotsHTML(dotColor);
    }
}

/*-- Category add new Category --*/
function renderNewCategoryError() {
    document.getElementById('add-task-new-category-error').innerHTML = '';
    document.getElementById('add-task-new-category-error').innerHTML = newCategoryErrorHTML();
}

function saveNewColor(dotColor) {
    selectedColorNewCategory = [];
    selectedColorNewCategory.push(dotColor);
    console.log(selectedColorNewCategory); // TEST: WENN FUNKTION FERTIG DANN LÖSCHEN
}

function saveNewCategory() {
    let newType = document.getElementById('new-category-type-name');

    if (newType.value == '' || selectedColorNewCategory.length == 0) {
        console.log('ERROR KEIN TYPE ODER FARBE');
        const errorMessage = document.querySelector('.new-category-error');
        errorMessage.classList.add('d-flex');
        return;
    }
}



/*-- Category Template-HTML --*/
function loadCategoryHTML() {
    return /*html*/`
    <div class="add-task-category-dropdown-top" id="add-task-category-dropdown-top" onclick="openCategoryDropdown()">
        <span>Select task category</span>
        <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
    </div>
    <div id="add-task-category-dropdown" class="add-task-category-dropdown-open d-none">                          
     </div>
    `;
}

function openTopCategoryPlaceholderHTML() {
    return /*html*/`
    <span>Select task category</span>
    <img src="assets/img/icons/add-task-dropdown-arrow.svg" alt="arrow">
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
    <div class="add-task-category-dropdown-top">
        <input id="new-category-type-name" class="add-task-new-categroy-input" type="text" placeholder="New category name">
            <div class="add-task-new-categroy-buttons">
            <img src="./assets/img/icons/add-task-button-cross.svg" onclick="initCategory()" alt="cross">
            <div class="add-task-category-greyline"></div>
            <img src="./assets/img/icons/add-task-button-check.svg" onclick="saveNewCategory()" alt="check">
        </div>
    </div>
    `;
}

function openNewCategoryDotsHTML(dotColor) {
    return /*html*/`
    <div class="dropdown-option-dots new-category-dot" style="background-color: ${dotColor};" onclick="saveNewColor('${dotColor}')"></div>
    `;
}

function newCategoryErrorHTML() {
    return /*html*/ `
    <span class="new-category-error">Please write a category name and pick a color</span>
    `;
}
