let allCategoryColor = ['#FC71FF', '#1FD7C1' ,'#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF'];
let defaultCategoryColor = ['#FC71FF','#1FD7C1', '#FF8A00', '#8AA4FF'];
let defaultCategoryType = ['Sale', 'Backoffice', 'Design', 'Marketing'];


function openCategoryDropdown() {
    document.getElementById('add-task-category-dropdown').classList.toggle('d-none');
    renderCategorySelection();
}

function renderCategorySelection() {
    document.getElementById('add-task-category-dropdown').innerHTML = '';
    document.getElementById('add-task-category-dropdown').innerHTML = openNewCategory();

    for(let i=0; i < defaultCategoryColor.length; i++) {
        let color = defaultCategoryColor[i];
        let type = defaultCategoryType[i];

        document.getElementById('add-task-category-dropdown').innerHTML += openCategorysHTML(color, type);
    }
}

function openNewCategory() {
    return`
    <div class="add-task-dropdown-new-category">New Category</div>
    `;
}

function openCategorysHTML(color, type) {
    return `
    <div class="add-task-dropdown-option">
        <div>${type}</div>
        <div class="dopdown-option-dots" style="background-color: ${color};"></div>
    </div>
     `;
}