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

// Handling Taks
function handleTaskSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    if (!title) return;
    
    if (editingTaskId !== null) {
        const task = tasks.find(t => t.id === editingTaskId);
        if (task) task.title = title;
    } else {
        tasks.push({
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        });
    }
    
    editingTaskId = null;
    saveTasks();
    showView('taskList');
}

// Render Tasks
function renderTasks(completed) {
    const container = completed ? lists.completed : lists.tasks;
    const filteredTasks = tasks.filter(task => task.completed === completed);
    
    container.innerHTML = filteredTasks.length ? '' : 
        `<p class="empty-message">No ${completed ? 'completed' : ''} tasks yet.</p>`;
    
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-actions">
                <button class="task-btn complete-btn" data-id="${task.id}">
                    ${completed ? 'Undo' : 'Complete'}
                </button>
                ${!completed ? `<button class="task-btn edit-btn" data-id="${task.id}">Edit</button>` : ''}
                <button class="task-btn delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;
        
        container.appendChild(taskElement);
        ['complete', 'edit', 'delete'].forEach(action => {
            const btn = taskElement.querySelector(`.${action}-btn`);
            if (btn) btn.addEventListener('click', () => handleTaskAction(action, task.id));
        });
    });
}

// Task Actions
function handleTaskAction(action, taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    switch(action) {
        case 'complete':
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            break;
        case 'edit':
            const task = tasks[taskIndex];
            if (task.completed) return;
            editingTaskId = taskId;
            document.getElementById('taskTitle').value = task.title;
            showView('addTask');
            document.getElementById('taskTitle').focus();
            return;
        case 'delete':
            if (!confirm('Are you sure you want to delete this task?')) return;
            tasks = tasks.filter(t => t.id !== taskId);
            break;
    }
    
    saveTasks();
    // Remain/static in current view after action
    const currentView = Object.keys(views).find(view => views[view].style.display === 'block');
    showView(currentView);
}

// Save Tasks
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

