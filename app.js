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

// Handling user Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage
    try {
        const savedTasks = localStorage.getItem('tasks');
        tasks = savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
        console.error("Error loading tasks:", e);
        tasks = [];
    }
    showView('taskList');
    setupEventListeners();
   
});

// Get the modal
let modal = document.getElementById("modal");

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

    // When the user clicks the button (width <= 987), open the task container named modal 
    if(screen.width <= 987){
        modal.style.display = "block";
    }
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal (width <= 987), close it
if(screen.width <= 987){
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

// Handling Taks
function handleTaskSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    if (!title) return;
    
    if (editingTaskId !== null) {
        const task = tasks.find(t => t.id === editingTaskId);
        if (task) {
            task.title = title;
            showNotification('Task updated successfully!');
        }
    } else {
        tasks.push({
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        });
        showNotification('Task added successfully!');
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
                    <i class="fas fa-${completed ? 'undo' : 'check'}"></i>
                    ${completed ? 'Undo' : 'Complete'}
                </button>
                ${!completed ? `
                <button class="task-btn edit-btn" data-id="${task.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>` : ''}
                <button class="task-btn delete-btn" data-id="${task.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
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
            showNotification(`Task ${tasks[taskIndex].completed ? 'completed' : 'marked incomplete'}`);
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
            showNotification('Task deleted successfully!');
            break;
    }
    
    saveTasks();
    const currentView = Object.keys(views).find(view => views[view].style.display === 'block');
    showView(currentView);
}

// Save Tasks
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

