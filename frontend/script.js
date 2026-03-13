// REGISTER
const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", async function(e){

e.preventDefault();

const username = document.getElementById("regUsername").value.trim();
const email = document.getElementById("regEmail").value.trim();
const password = document.getElementById("regPassword").value.trim();
const confirmPassword = document.getElementById("regConfirmPassword").value.trim();

const message = document.getElementById("regMessage");

// check if passwords match
if(password !== confirmPassword){

message.innerText = "Passwords do not match!";
message.style.color = "red";
return;

}

try{

const res = await fetch("http://localhost:3000/auth/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
username,
email,
password
})
});

const data = await res.json();

message.innerText = "Account created successfully!";
message.style.color = "green";

// redirect after 1.5 seconds
setTimeout(() => {
    window.location.href = "login.html";
}, 1500);

}catch(error){

message.innerText = "Registration failed.";
message.style.color = "red";

}

});

}


// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

try{

const res = await fetch("http://localhost:3000/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
password
})

});

const data = await res.json();

console.log(data);

if(data.success){

window.location.href = "dashboard.html";

}else{

document.getElementById("message").innerText = data.message;

}

}catch(error){

document.getElementById("message").innerText = "Login failed";

}

});

}

// LOGOUT FUNCTION
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {

    // optional: clear saved login data
    localStorage.removeItem("user");

    // redirect to login page
    window.location.href = "login.html";

  });
}
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const taskCounter = document.getElementById('taskCounter');

    // 1. Load tasks from LocalStorage (sharing data with your calendar)
    let tasks = JSON.parse(localStorage.getItem('eduFlowTasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            emptyState.style.display = 'block';
            taskCounter.innerText = '0 Tasks';
            return;
        }

        emptyState.style.display = 'none';
        taskCounter.innerText = `${tasks.length} Task${tasks.length > 1 ? 's' : ''}`;

        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-4">
                    <div class="fw-bold text-dark">${task.title}</div>
                    <div class="small text-muted">${task.start} ${task.time || ''}</div>
                </td>
                <td><span class="small text-muted">${task.fileName || 'No file'}</span></td>
                <td>
                    <span class="badge ${task.status === 'completed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} rounded-pill">
                        ${task.status === 'completed' ? '🟢 Completed' : '🟡 Pending'}
                    </span>
                </td>
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-outline-danger border-0" onclick="deleteTask('${task.id}')">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    // 2. Handle Form Submission
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const newTask = {
                id: String(Date.now()),
                title: document.getElementById('taskTitle').value,
                start: document.getElementById('taskDate').value,
                time: document.getElementById('taskTime').value,
                status: document.getElementById('taskStatus').value,
                fileName: document.getElementById('taskFile').files[0]?.name || ''
            };

            tasks.push(newTask);
            localStorage.setItem('eduFlowTasks', JSON.stringify(tasks));
            
            taskForm.reset();
            renderTasks();
        });
    }

    // 3. Delete Function
    window.deleteTask = function(id) {
        if (confirm('Delete this task?')) {
            tasks = tasks.filter(t => String(t.id) !== String(id));
            localStorage.setItem('eduFlowTasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    renderTasks();
});
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const modalElement = document.getElementById('eventModal');
    const eventModal = new bootstrap.Modal(modalElement);
    
    let savedTasks = JSON.parse(localStorage.getItem('eduFlowTasks')) || [];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth' },
        events: savedTasks,
        editable: true,
        
        // 1. CLICK EMPTY BOX TO ADD
        dateClick: function(info) {
            document.getElementById('modalTitle').innerText = "Add Task for " + info.dateStr;
            document.getElementById('taskInput').value = "";
            document.getElementById('eventDate').value = info.dateStr;
            document.getElementById('eventId').value = ""; // No ID means new task
            document.getElementById('deleteTaskBtn').style.display = "none";
            eventModal.show();
        },

        // 2. CLICK EXISTING TASK TO EDIT/DELETE
        eventClick: function(info) {
            document.getElementById('modalTitle').innerText = "Edit Task";
            document.getElementById('taskInput').value = info.event.title;
            document.getElementById('eventDate').value = info.event.startStr;
            document.getElementById('eventId').value = info.event.id;
            document.getElementById('deleteTaskBtn').style.display = "block";
            eventModal.show();
        }
    });

    // HANDLE SAVE (Both Add and Update)
    document.getElementById('saveTaskBtn').onclick = function() {
        const title = document.getElementById('taskInput').value;
        const date = document.getElementById('eventDate').value;
        const id = document.getElementById('eventId').value;

        if (!title) return;

        if (id) {
            // Update Existing
            savedTasks = savedTasks.map(t => t.id === id ? { ...t, title: title } : t);
        } else {
            // Add New
            savedTasks.push({ id: String(Date.now()), title: title, start: date, allDay: true });
        }

        updateCalendar();
        eventModal.hide();
    };

    // HANDLE DELETE
    document.getElementById('deleteTaskBtn').onclick = function() {
        const id = document.getElementById('eventId').value;
        savedTasks = savedTasks.filter(t => t.id !== id);
        updateCalendar();
        eventModal.hide();
    };

    function updateCalendar() {
        localStorage.setItem('eduFlowTasks', JSON.stringify(savedTasks));
        calendar.removeAllEvents();
        calendar.addEventSource(savedTasks);
    }

    calendar.render();
});
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get shared data
    const tasks = JSON.parse(localStorage.getItem('eduFlowTasks')) || [];
    
    // 2. Update the Stat Cards
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;

    if(document.getElementById('totalTasksCount')) {
        document.getElementById('totalTasksCount').innerText = total;
        document.getElementById('pendingTasksCount').innerText = pending;
        document.getElementById('completedTasksCount').innerText = completed;
    }

    // 3. Initialize Chart
    const ctx = document.getElementById('taskChart');
    if (ctx) {
        // Create a nice gradient for the bars
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(78, 115, 223, 1)');
        gradient.addColorStop(1, 'rgba(78, 115, 223, 0.1)');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Tasks Created',
                    data: [total, pending, completed, 5, 2, total + 1, 4], // Replace with real weekly logic if needed
                    backgroundColor: gradient,
                    borderColor: '#4e73df',
                    borderWidth: 2,
                    borderRadius: 10,
                    barPercentage: 0.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { stepSize: 1 }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('eduFlowTasks')) || [];

    // Update Number Stats
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    const pendingCount = totalCount - completedCount;

    if (document.getElementById('totalTasksCount')) {
        document.getElementById('totalTasksCount').innerText = totalCount;
        document.getElementById('pendingTasksCount').innerText = pendingCount;
        document.getElementById('completedTasksCount').innerText = completedCount;
    }

    // Chart.js Progress Graph
    const ctx = document.getElementById('taskChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line', // Changed to line for a more 'progressive' feel
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Tasks Completion Path',
                    data: [0, 2, pendingCount, totalCount, completedCount, 4, totalCount + 2], // Dummy trend based on data
                    fill: true,
                    backgroundColor: 'rgba(78, 115, 223, 0.1)',
                    borderColor: '#4e73df',
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#4e73df'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
});
