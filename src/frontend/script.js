// Handle login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    document.getElementById('message').textContent = data.message;

    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    }
  });
}

// Load dashboard tasks
const tasksDiv = document.getElementById('tasks');
if (tasksDiv) {
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      // Display tasks
      tasksDiv.innerHTML = data.tasks
        .map(task => `<p>${task.title} - ${task.status}</p>`)
        .join('');

      // Count tasks by status for chart
      const pendingCount = data.tasks.filter(t => t.status === 'pending').length;
      const completedCount = data.tasks.filter(t => t.status === 'completed').length;

      // Render chart
      const ctx = document.getElementById('taskChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'Completed'],
          datasets: [{
            data: [pendingCount, completedCount],
            backgroundColor: ['#f39c12', '#27ae60']
          }]
        }
      });
    });

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}
