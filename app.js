const views = {
    taskList: document.getElementById('taskListView'),
    addTask: document.getElementById('addTaskView'),
    completedTasks: document.getElementById('completedTasksView')
};
const lists = {
    tasks: document.getElementById('tasksList'),
    completed: document.getElementById('completedTasksList')
};
const buttons = {
    taskList: document.getElementById('taskListBtn'),
    addTask: document.getElementById('addTaskBtn'),
    completedTasks: document.getElementById('completedTasksBtn')
};
const addTaskForm = document.getElementById('addTaskForm');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const headerLeft = document.getElementById('headerLeft');

// Tasks
let tasks = [];
let editingTaskId = null;

// Start
document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setupEventListeners();
    showView('taskList');
});

// Event Listeners
function setupEventListeners() {
    Object.entries(buttons).forEach(([view, btn]) => 
        btn.addEventListener('click', () => showView(view)));
    addTaskForm.addEventListener('submit', handleTaskSubmit);
    mobileMenuBtn.addEventListener('click', () => headerLeft.classList.toggle('active'));
}

// View Management
function showView(viewName) {
    Object.values(views).forEach(view => view.style.display = 'none');
    Object.values(buttons).forEach(btn => btn.classList.remove('active'));
    
    views[viewName].style.display = 'block';
    buttons[viewName].classList.add('active');
    
    if (viewName === 'taskList') renderTasks(false);
    else if (viewName === 'completedTasks') renderTasks(true);
    else if (editingTaskId === null) addTaskForm.reset();
}