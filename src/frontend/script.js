/**
 * GLOBAL STORAGE HELPERS
 */
const getTasksFromVault = () => {
    const saved = localStorage.getItem('eduFlow_tasks');
    return saved ? JSON.parse(saved) : [];
};

const saveTasksToVault = (tasks) => {
    localStorage.setItem('eduFlow_tasks', JSON.stringify(tasks));
};

/**
 * UI CONTROLLER - NAVIGATION & INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop() || 'dashboard.html';
    
    // Highlight Active Sidebar Link
    document.querySelectorAll('.sidebar a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Page Specific Initialization
    if (document.getElementById('taskChart')) initDashboard();
    if (document.getElementById('taskForm')) initTaskManager();
});

/**
 * DASHBOARD LOGIC
 * Pulls from localStorage and renders the Chart
 */
function initDashboard() {
    const tasks = getTasksFromVault();
    const tasksDiv = document.getElementById('tasks');

    // 1. Render Summary Cards (Last 3 tasks)
    if (tasksDiv) {
        if (tasks.length === 0) {
            tasksDiv.innerHTML = '<div class="col-12"><p class="text-muted">No tasks yet. Go to the Tasks page to start!</p></div>';
        } else {
            tasksDiv.innerHTML = tasks.slice(-3).reverse().map(task => `
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm p-3 border-start border-primary border-4">
                        <small class="text-muted fw-bold text-uppercase" style="font-size: 0.7rem;">${task.status}</small>
                        <p class="fw-bold mb-0 text-truncate">${task.title}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // 2. Render Chart.js
    const pendingCount = tasks.filter(t => t.status === 'pending').length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    const ctx = document.getElementById('taskChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'Completed'],
            datasets: [{
                data: [pendingCount || 1, completedCount], // Default to 1 pending if empty to show chart
                backgroundColor: ['#e9ecef', '#4e73df'],
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
            }
        }
    });
}

/**
 * TASK MANAGER LOGIC
 * Handles persistence and table rendering
 */
function initTaskManager() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    
    // Load existing tasks
    const tasks = getTasksFromVault();
    tasks.forEach(task => renderTaskRow(task));
    updateTaskCounter();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            title: document.getElementById('taskTitle').value,
            date: document.getElementById('taskDate').value,
            time: document.getElementById('taskTime').value,
            status: document.getElementById('taskStatus').value,
            file: document.getElementById('taskFile').files[0]?.name || "No file"
        };

        const allTasks = getTasksFromVault();
        allTasks.push(newTask);
        saveTasksToVault(allTasks);

        renderTaskRow(newTask);
        updateTaskCounter();
        taskForm.reset();
    });
}

function renderTaskRow(task) {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;

    const isDone = task.status === 'completed';
    const row = document.createElement('tr');
    row.setAttribute('data-id', task.id);
    
    row.innerHTML = `
        <td class="ps-4">
            <div class="fw-bold">${task.title}</div>
            <small class="text-muted"><i class="bi bi-calendar3 me-1"></i>${task.date} | ${task.time}</small>
        </td>
        <td><small class="text-truncate d-inline-block" style="max-width: 120px;">${task.file}</small></td>
        <td><span class="badge ${isDone ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} rounded-pill px-3">${task.status}</span></td>
        <td class="text-end pe-4">
            <div class="btn-group">
                <button class="btn btn-sm btn-light border" onclick="toggleStatus(${task.id})">
                    <i class="bi ${isDone ? 'bi-x-lg text-danger' : 'bi-check-lg text-success'}"></i>
                </button>
                <button class="btn btn-sm btn-light border text-danger" onclick="deleteTask(${task.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
    `;
    taskList.prepend(row);
    if(document.getElementById('emptyState')) document.getElementById('emptyState').classList.add('d-none');
}

/**
 * GLOBAL ACTIONS (Available to buttons in rows)
 */
window.toggleStatus = (id) => {
    let tasks = getTasksFromVault();
    tasks = tasks.map(t => {
        if (t.id === id) {
            t.status = t.status === 'completed' ? 'pending' : 'completed';
        }
        return t;
    });
    saveTasksToVault(tasks);
    location.reload(); // Refresh to update UI and badges
};

window.deleteTask = (id) => {
    if (confirm("Delete this task?")) {
        let tasks = getTasksFromVault();
        tasks = tasks.filter(t => t.id !== id);
        saveTasksToVault(tasks);
        document.querySelector(`tr[data-id="${id}"]`).remove();
        updateTaskCounter();
    }
};

function updateTaskCounter() {
    const counter = document.getElementById('taskCounter');
    const tasks = getTasksFromVault();
    if (counter) counter.innerText = `${tasks.length} Tasks`;
}

// Keep your existing Settings and Profile logic below...

// --- LOGIN LOGIC ---
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const message = document.getElementById('message');

        // Simple hardcoded login for your local project
        if (user === "Junnel" && pass === "1234") {
            // Save login state to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', user);
            
            message.innerHTML = `<span class="text-success">Success! Redirecting...</span>`;
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            message.innerHTML = `<span class="text-danger">Wrong username or password!</span>`;
        }
    });
}
/**
 * CORE SETTINGS LOGIC
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Always apply the theme as soon as any page loads
    applySavedTheme();

    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        // 2. Load existing data into the inputs
        const savedData = localStorage.getItem('eduFlow_settings');
        if (savedData) {
            const settings = JSON.parse(savedData);
            // Match these IDs exactly to your HTML
            if(document.getElementById('emailInput')) document.getElementById('emailInput').value = settings.email;
            if(document.getElementById('themeSelect')) document.getElementById('themeSelect').value = settings.theme;
            if(document.getElementById('emailNotif')) document.getElementById('emailNotif').checked = settings.emailNotif;
            if(document.getElementById('taskReminders')) document.getElementById('taskReminders').checked = settings.taskReminders;
            console.log("Settings loaded from storage:", settings);
        }

        // 3. Save Handle
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const settings = {
                email: document.getElementById('emailInput').value,
                theme: document.getElementById('themeSelect').value,
                emailNotif: document.getElementById('emailNotif').checked,
                taskReminders: document.getElementById('taskReminders').checked
            };

            localStorage.setItem('eduFlow_settings', JSON.stringify(settings));
            applyTheme(settings.theme);
            
            alert("✅ Settings Saved!");
            console.log("Settings saved to storage:", settings);
        });
    }
});

function applySavedTheme() {
    const savedData = localStorage.getItem('eduFlow_settings');
    if (savedData) {
        const settings = JSON.parse(savedData);
        applyTheme(settings.theme);
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        console.log("Dark mode active");
    } else {
        document.body.classList.remove('dark-mode');
        console.log("Light mode active");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load existing images from LocalStorage
    const savedAvatar = localStorage.getItem('user_avatar');
    const savedCover = localStorage.getItem('user_cover');

    if (savedAvatar) document.getElementById('profileAvatar').src = savedAvatar;
    if (savedCover) document.getElementById('coverPhoto').style.backgroundImage = `url(${savedCover})`;

    // 2. Setup Elements
    const avatarImg = document.getElementById('profileAvatar');
    const avatarInput = document.getElementById('avatarInput');
    const coverDiv = document.getElementById('coverPhoto');
    const coverInput = document.getElementById('coverInput');

    // 3. Avatar Click Logic
    if (avatarImg) {
        avatarImg.parentElement.onclick = () => avatarInput.click();
        avatarInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Image = event.target.result;
                    avatarImg.src = base64Image;
                    localStorage.setItem('user_avatar', base64Image); // Save to vault
                };
                reader.readAsDataURL(file);
            }
        };
    }

    // 4. Cover Photo Click Logic
    if (coverDiv) {
        coverDiv.onclick = () => coverInput.click();
        coverInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Image = event.target.result;
                    coverDiv.style.backgroundImage = `url(${base64Image})`;
                    localStorage.setItem('user_cover', base64Image); // Save to vault
                };
                reader.readAsDataURL(file);
            }
        };
    }
});