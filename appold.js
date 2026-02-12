// Academic Student Reminder Application
// Main JavaScript File

// Application State
const AppState = {
    currentUser: null,
    currentPage: 'dashboard',
    tasks: [],
    assignments: [],
    exams: [],
    projects: [],
    events: [],
    notifications: [],
    currentDate: new Date()
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
        AppState.currentUser = JSON.parse(user);
        loadUserData();
        showMainApp();
        initializeMainApp();
    } else {
        showAuthPage();
    }
    
    setupAuthListeners();
}

// Authentication
function setupAuthListeners() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple authentication (in production, use proper backend authentication)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        AppState.currentUser = { email: user.email, name: user.name };
        localStorage.setItem('currentUser', JSON.stringify(AppState.currentUser));
        loadUserData();
        showMainApp();
        initializeMainApp();
    } else {
        alert('Invalid email or password');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;

    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    AppState.currentUser = { email, name };
    localStorage.setItem('currentUser', JSON.stringify(AppState.currentUser));
    
    // Initialize empty data for new user
    const userKey = `userData_${email}`;
    localStorage.setItem(userKey, JSON.stringify({
        tasks: [],
        assignments: [],
        exams: [],
        projects: [],
        events: []
    }));

    loadUserData();
    showMainApp();
    initializeMainApp();
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    AppState.currentUser = null;
    location.reload();
}

function showAuthPage() {
    document.getElementById('authContainer').style.display = 'flex';
    document.querySelector('.app-container').style.display = 'none';
}

function showMainApp() {
    document.getElementById('authContainer').style.display = 'none';
    document.querySelector('.app-container').style.display = 'flex';
    
    // Update user name in UI
    if (AppState.currentUser) {
        document.getElementById('userName').textContent = AppState.currentUser.name;
        const avatar = document.querySelector('.avatar');
        const initials = AppState.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        avatar.textContent = initials;
    }
}

function loadUserData() {
    if (!AppState.currentUser) return;
    
    const userKey = `userData_${AppState.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    
    AppState.tasks = userData.tasks || [];
    AppState.assignments = userData.assignments || [];
    AppState.exams = userData.exams || [];
    AppState.projects = userData.projects || [];
    AppState.events = userData.events || [];
    
    // Initialize with sample data if empty
    if (AppState.tasks.length === 0) {
        initializeSampleData();
    }
}

function saveUserData() {
    if (!AppState.currentUser) return;
    
    const userKey = `userData_${AppState.currentUser.email}`;
    const userData = {
        tasks: AppState.tasks,
        assignments: AppState.assignments,
        exams: AppState.exams,
        projects: AppState.projects,
        events: AppState.events
    };
    
    localStorage.setItem(userKey, JSON.stringify(userData));
}

function initializeSampleData() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    AppState.tasks = [
        {
            id: generateId(),
            title: 'Complete Math Homework',
            description: 'Solve problems 1-20 from Chapter 5',
            date: tomorrow.toISOString(),
            priority: 'high',
            category: 'Mathematics',
            completed: false,
            reminder: 60
        },
        {
            id: generateId(),
            title: 'Prepare Physics Lab Report',
            description: 'Write up the results from last week\'s experiment',
            date: tomorrow.toISOString(),
            priority: 'medium',
            category: 'Physics',
            completed: false,
            reminder: 1440
        }
    ];
    
    AppState.assignments = [
        {
            id: generateId(),
            title: 'Research Paper on AI Ethics',
            description: 'Write a 10-page research paper on ethical implications of AI',
            date: nextWeek.toISOString(),
            priority: 'high',
            category: 'Computer Science',
            status: 'pending'
        }
    ];
    
    AppState.exams = [
        {
            id: generateId(),
            title: 'Midterm Examination',
            subject: 'Advanced Calculus',
            date: nextWeek.toISOString(),
            location: 'Room 204, Science Building',
            duration: '3 hours'
        }
    ];
    
    AppState.projects = [
        {
            id: generateId(),
            title: 'Mobile App Development',
            description: 'Build a task management mobile application',
            date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'urgent',
            category: 'Software Engineering',
            status: 'in-progress',
            progress: 45
        }
    ];
    
    AppState.events = [
        {
            id: generateId(),
            title: 'Guest Lecture on Machine Learning',
            description: 'Dr. Sarah Johnson will discuss recent advances in ML',
            date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Main Auditorium',
            type: 'lecture'
        }
    ];
    
    saveUserData();
}

function initializeMainApp() {
    setupNavigation();
    setupModals();
    setupNotifications();
    setupCalendar();
    updateDashboard();
    renderAllPages();
    checkReminders();
    
    // Check reminders every minute
    setInterval(checkReminders, 60000);
}

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(pageName) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}-page`).classList.add('active');
    
    // Update header
    updatePageHeader(pageName);
    
    AppState.currentPage = pageName;
    
    // Render page content
    renderPage(pageName);
}

function updatePageHeader(pageName) {
    const titles = {
        dashboard: { title: 'Dashboard', subtitle: 'Welcome back, ready to conquer your day?' },
        tasks: { title: 'Tasks for Today', subtitle: 'Keep track of your daily tasks' },
        assignments: { title: 'Assignments', subtitle: 'Manage your homework and submissions' },
        exams: { title: 'Examinations', subtitle: 'Prepare for your upcoming exams' },
        projects: { title: 'Project Deadlines', subtitle: 'Track your long-term projects' },
        events: { title: 'Institutional Events', subtitle: 'Stay updated with campus activities' },
        calendar: { title: 'Calendar', subtitle: 'View all your events at a glance' },
        progress: { title: 'Progress Tracking', subtitle: 'Monitor your academic performance' }
    };
    
    const pageInfo = titles[pageName];
    document.getElementById('pageTitle').textContent = pageInfo.title;
    document.getElementById('pageSubtitle').textContent = pageInfo.subtitle;
}

// Dashboard
function updateDashboard() {
    updateStats();
    renderTodayTasks();
    renderWeekTimeline();
}

function updateStats() {
    const urgentTasks = AppState.tasks.filter(t => !t.completed && t.priority === 'urgent').length;
    const upcomingEvents = [...AppState.assignments, ...AppState.exams, ...AppState.events].length;
    const completedTasks = AppState.tasks.filter(t => t.completed).length;
    const totalTasks = AppState.tasks.length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    document.getElementById('urgentCount').textContent = urgentTasks;
    document.getElementById('upcomingCount').textContent = upcomingEvents;
    document.getElementById('completedCount').textContent = completedTasks;
    document.getElementById('progressPercent').textContent = progress + '%';
}

function renderTodayTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    const todayTasks = AppState.tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= today && taskDate < tomorrow;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const container = document.getElementById('todayTasks');
    
    if (todayTasks.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 2rem;">No tasks for today. Great job! 🎉</p>';
        return;
    }
    
    container.innerHTML = todayTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-checkbox" onclick="toggleTask('${task.id}')"></div>
            <div class="task-details">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    ${task.category} • ${formatTime(task.date)}
                </div>
            </div>
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
        </div>
    `).join('');
}

function renderWeekTimeline() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingItems = [
        ...AppState.tasks.map(t => ({ ...t, type: 'task' })),
        ...AppState.assignments.map(a => ({ ...a, type: 'assignment' })),
        ...AppState.exams.map(e => ({ ...e, type: 'exam' })),
        ...AppState.events.map(e => ({ ...e, type: 'event' }))
    ].filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= today && itemDate <= nextWeek;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const container = document.getElementById('weekTimeline');
    
    if (upcomingItems.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 2rem;">No upcoming events this week</p>';
        return;
    }
    
    container.innerHTML = upcomingItems.slice(0, 5).map(item => {
        const itemDate = new Date(item.date);
        const day = itemDate.getDate();
        
        return `
            <div class="timeline-item">
                <div class="timeline-date">${day}</div>
                <div class="timeline-content">
                    <div class="timeline-title">${item.title}</div>
                    <div class="timeline-meta">
                        ${item.type.charAt(0).toUpperCase() + item.type.slice(1)} • ${formatDate(item.date)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Pages
function renderAllPages() {
    renderTasksPage();
    renderAssignmentsPage();
    renderExamsPage();
    renderProjectsPage();
    renderEventsPage();
    renderCalendarPage();
    renderProgressPage();
}

function renderPage(pageName) {
    switch(pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'tasks':
            renderTasksPage();
            break;
        case 'assignments':
            renderAssignmentsPage();
            break;
        case 'exams':
            renderExamsPage();
            break;
        case 'projects':
            renderProjectsPage();
            break;
        case 'events':
            renderEventsPage();
            break;
        case 'calendar':
            renderCalendarPage();
            break;
        case 'progress':
            renderProgressPage();
            break;
    }
}

function renderTasksPage() {
    const container = document.getElementById('tasksContainer');
    const filter = document.getElementById('taskFilter')?.value || 'all';
    
    let tasks = AppState.tasks;
    
    if (filter === 'pending') {
        tasks = tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
        tasks = tasks.filter(t => t.completed);
    } else if (filter === 'overdue') {
        tasks = tasks.filter(t => !t.completed && new Date(t.date) < new Date());
    }
    
    if (tasks.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 3rem;">No tasks found</p>';
        return;
    }
    
    container.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-checkbox" onclick="toggleTask('${task.id}')"></div>
            <div class="task-details">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    ${task.description || ''}<br>
                    ${task.category} • ${formatDate(task.date)} ${formatTime(task.date)}
                </div>
            </div>
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
            <div class="assignment-actions">
                <button class="icon-btn" onclick="editItem('task', '${task.id}')">✏️</button>
                <button class="icon-btn" onclick="deleteItem('task', '${task.id}')">🗑️</button>
            </div>
        </div>
    `).join('');
}

function renderAssignmentsPage() {
    const container = document.getElementById('assignmentsGrid');
    const filter = document.getElementById('assignmentFilter')?.value || 'all';
    
    let assignments = AppState.assignments;
    
    if (filter !== 'all') {
        assignments = assignments.filter(a => a.status === filter);
    }
    
    if (assignments.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 3rem; grid-column: 1/-1;">No assignments found</p>';
        return;
    }
    
    container.innerHTML = assignments.map(assignment => `
        <div class="assignment-card">
            <div class="assignment-header">
                <div>
                    <h3 class="assignment-title">${assignment.title}</h3>
                    <p class="assignment-category">${assignment.category}</p>
                </div>
                <span class="assignment-status status-${assignment.status}">${assignment.status}</span>
            </div>
            <p class="assignment-description">${assignment.description}</p>
            <div class="assignment-footer">
                <div class="assignment-date">
                    📅 Due: ${formatDate(assignment.date)}
                </div>
                <div class="assignment-actions">
                    <button class="icon-btn" onclick="editItem('assignment', '${assignment.id}')">✏️</button>
                    <button class="icon-btn" onclick="deleteItem('assignment', '${assignment.id}')">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderExamsPage() {
    const container = document.getElementById('examsList');
    
    if (AppState.exams.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 3rem;">No exams scheduled</p>';
        return;
    }
    
    container.innerHTML = AppState.exams.map(exam => {
        const examDate = new Date(exam.date);
        const month = examDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        const day = examDate.getDate();
        
        return `
            <div class="exam-card">
                <div class="exam-date-block">
                    <div class="exam-month">${month}</div>
                    <div class="exam-day">${day}</div>
                </div>
                <div class="exam-details">
                    <h3>${exam.title}</h3>
                    <p class="exam-subject">${exam.subject}</p>
                    <p class="exam-location">📍 ${exam.location}</p>
                    <p class="exam-location">⏱️ ${exam.duration}</p>
                </div>
                <div class="assignment-actions">
                    <button class="icon-btn" onclick="editItem('exam', '${exam.id}')">✏️</button>
                    <button class="icon-btn" onclick="deleteItem('exam', '${exam.id}')">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderProjectsPage() {
    const container = document.getElementById('projectsGrid');
    
    if (AppState.projects.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 3rem; grid-column: 1/-1;">No projects found</p>';
        return;
    }
    
    container.innerHTML = AppState.projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-category">${project.category}</p>
                </div>
                <span class="project-status status-${project.status}">${project.status}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div style="margin: 1rem 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.9rem; color: var(--text-light);">Progress</span>
                    <span style="font-size: 0.9rem; font-weight: 600;">${project.progress || 0}%</span>
                </div>
                <div style="background: var(--light); height: 8px; border-radius: 10px; overflow: hidden;">
                    <div style="background: var(--gradient-1); height: 100%; width: ${project.progress || 0}%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            <div class="project-footer">
                <div class="project-date">
                    📅 Deadline: ${formatDate(project.date)}
                </div>
                <div class="project-actions">
                    <button class="icon-btn" onclick="editItem('project', '${project.id}')">✏️</button>
                    <button class="icon-btn" onclick="deleteItem('project', '${project.id}')">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderEventsPage() {
    const container = document.getElementById('eventsList');
    
    if (AppState.events.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 3rem;">No events scheduled</p>';
        return;
    }
    
    container.innerHTML = AppState.events.map(event => `
        <div class="event-card">
            <div class="event-icon">🎓</div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span>📅 ${formatDate(event.date)}</span>
                    <span>📍 ${event.location}</span>
                    <span>⏰ ${formatTime(event.date)}</span>
                </div>
            </div>
            <div class="assignment-actions">
                <button class="icon-btn" onclick="editItem('event', '${event.id}')">✏️</button>
                <button class="icon-btn" onclick="deleteItem('event', '${event.id}')">🗑️</button>
            </div>
        </div>
    `).join('');
}

function renderCalendarPage() {
    renderCalendar();
}

function renderCalendar() {
    const currentDate = AppState.currentDate;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('currentMonth').textContent = 
        `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();
    
    let dates = [];
    
    // Previous month dates
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        dates.push({
            date: prevLastDate - i,
            isCurrentMonth: false
        });
    }
    
    // Current month dates
    for (let i = 1; i <= lastDate; i++) {
        dates.push({
            date: i,
            isCurrentMonth: true
        });
    }
    
    // Next month dates
    const remainingDays = 42 - dates.length;
    for (let i = 1; i <= remainingDays; i++) {
        dates.push({
            date: i,
            isCurrentMonth: false
        });
    }
    
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = `
        <div class="calendar-days">
            <div class="calendar-day">Sun</div>
            <div class="calendar-day">Mon</div>
            <div class="calendar-day">Tue</div>
            <div class="calendar-day">Wed</div>
            <div class="calendar-day">Thu</div>
            <div class="calendar-day">Fri</div>
            <div class="calendar-day">Sat</div>
        </div>
        <div class="calendar-dates">
            ${dates.map(d => {
                const dateObj = new Date(year, month, d.date);
                const hasEvent = hasEventOnDate(dateObj);
                const isToday = isCurrentMonth && d.isCurrentMonth && d.date === todayDate;
                
                return `
                    <div class="calendar-date ${!d.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}"
                         onclick="showDateEvents('${dateObj.toISOString()}')">
                        ${d.date}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function hasEventOnDate(date) {
    const dateStr = date.toDateString();
    
    return [...AppState.tasks, ...AppState.assignments, ...AppState.exams, ...AppState.events]
        .some(item => new Date(item.date).toDateString() === dateStr);
}

function showDateEvents(dateStr) {
    const date = new Date(dateStr);
    const dateString = date.toDateString();
    
    const events = [...AppState.tasks, ...AppState.assignments, ...AppState.exams, ...AppState.events]
        .filter(item => new Date(item.date).toDateString() === dateString);
    
    const container = document.getElementById('calendarEvents');
    
    if (events.length === 0) {
        container.innerHTML = `<p style="color: var(--text-light); text-align: center; padding: 2rem;">No events on ${formatDate(dateStr)}</p>`;
        return;
    }
    
    container.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Events on ${formatDate(dateStr)}</h3>
        ${events.map(event => `
            <div style="padding: 1rem; background: white; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 8px var(--shadow);">
                <h4 style="margin-bottom: 0.5rem;">${event.title}</h4>
                <p style="color: var(--text-light); font-size: 0.9rem;">${event.description || event.subject || ''}</p>
            </div>
        `).join('')}
    `;
}

function renderProgressPage() {
    // Simple statistics display
    const detailedStats = document.getElementById('detailedStats');
    
    const totalTasks = AppState.tasks.length;
    const completedTasks = AppState.tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    const totalAssignments = AppState.assignments.length;
    const submittedAssignments = AppState.assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length;
    
    const upcomingExams = AppState.exams.length;
    const activeProjects = AppState.projects.filter(p => p.status === 'in-progress').length;
    
    detailedStats.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px var(--shadow);">
                <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Tasks Overview</h4>
                <p style="font-size: 2rem; font-weight: 700; color: var(--accent); margin-bottom: 0.5rem;">${completedTasks}/${totalTasks}</p>
                <p style="color: var(--text-light);">Tasks Completed</p>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px var(--shadow);">
                <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Assignments</h4>
                <p style="font-size: 2rem; font-weight: 700; color: var(--success); margin-bottom: 0.5rem;">${submittedAssignments}/${totalAssignments}</p>
                <p style="color: var(--text-light);">Submitted</p>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px var(--shadow);">
                <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Upcoming Exams</h4>
                <p style="font-size: 2rem; font-weight: 700; color: var(--danger); margin-bottom: 0.5rem;">${upcomingExams}</p>
                <p style="color: var(--text-light);">Scheduled</p>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px var(--shadow);">
                <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Active Projects</h4>
                <p style="font-size: 2rem; font-weight: 700; color: var(--warning); margin-bottom: 0.5rem;">${activeProjects}</p>
                <p style="color: var(--text-light);">In Progress</p>
            </div>
        </div>
        
        <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 2px 8px var(--shadow); margin-top: 2rem;">
            <h4 style="margin-bottom: 1rem; font-size: 1.1rem;">Performance by Category</h4>
            ${renderCategoryStats()}
        </div>
    `;
}

function renderCategoryStats() {
    const categories = {};
    
    AppState.tasks.forEach(task => {
        if (!categories[task.category]) {
            categories[task.category] = { total: 0, completed: 0 };
        }
        categories[task.category].total++;
        if (task.completed) {
            categories[task.category].completed++;
        }
    });
    
    return Object.entries(categories).map(([category, stats]) => {
        const percentage = Math.round((stats.completed / stats.total) * 100);
        return `
            <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>${category}</span>
                    <span style="font-weight: 600;">${percentage}%</span>
                </div>
                <div style="background: var(--light); height: 8px; border-radius: 10px; overflow: hidden;">
                    <div style="background: var(--gradient-1); height: 100%; width: ${percentage}%;"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Modals
function setupModals() {
    const modal = document.getElementById('itemModal');
    const modalClose = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const itemForm = document.getElementById('itemForm');
    
    // Quick action buttons
    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const type = action.replace('add-', '');
            openModal(type);
        });
    });
    
    // Add buttons
    const addButtons = {
        'addTaskBtn': 'task',
        'addAssignmentBtn': 'assignment',
        'addExamBtn': 'exam',
        'addProjectBtn': 'project',
        'addEventBtn': 'event'
    };
    
    Object.entries(addButtons).forEach(([btnId, type]) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => openModal(type));
        }
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Form submission
    itemForm.addEventListener('submit', handleFormSubmit);
    
    // Filter changes
    const filters = ['taskFilter', 'assignmentFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                if (filterId === 'taskFilter') renderTasksPage();
                if (filterId === 'assignmentFilter') renderAssignmentsPage();
            });
        }
    });
    
    // Calendar navigation
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    
    if (prevMonth) {
        prevMonth.addEventListener('click', function() {
            AppState.currentDate.setMonth(AppState.currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextMonth) {
        nextMonth.addEventListener('click', function() {
            AppState.currentDate.setMonth(AppState.currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
}

function openModal(type, id = null) {
    const modal = document.getElementById('itemModal');
    const form = document.getElementById('itemForm');
    const modalTitle = document.getElementById('modalTitle');
    
    form.reset();
    document.getElementById('itemType').value = type;
    document.getElementById('itemId').value = id || '';
    
    const titles = {
        task: 'Task',
        assignment: 'Assignment',
        exam: 'Exam',
        project: 'Project',
        event: 'Event'
    };
    
    modalTitle.textContent = id ? `Edit ${titles[type]}` : `Add New ${titles[type]}`;
    
    // Show/hide fields based on type
    const categoryGroup = document.getElementById('categoryGroup');
    const reminderGroup = document.getElementById('reminderGroup');
    
    categoryGroup.style.display = ['task', 'assignment', 'project'].includes(type) ? 'block' : 'none';
    reminderGroup.style.display = type === 'task' ? 'block' : 'none';
    
    // If editing, populate form
    if (id) {
        const item = getItemById(type, id);
        if (item) {
            document.getElementById('itemTitle').value = item.title;
            document.getElementById('itemDescription').value = item.description || item.subject || '';
            document.getElementById('itemDate').value = formatDateTimeLocal(item.date);
            document.getElementById('itemPriority').value = item.priority || 'medium';
            if (item.category) document.getElementById('itemCategory').value = item.category;
            if (item.reminder !== undefined) document.getElementById('itemReminder').value = item.reminder;
        }
    }
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('itemModal').classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const type = document.getElementById('itemType').value;
    const id = document.getElementById('itemId').value;
    
    const item = {
        id: id || generateId(),
        title: document.getElementById('itemTitle').value,
        description: document.getElementById('itemDescription').value,
        date: document.getElementById('itemDate').value,
        priority: document.getElementById('itemPriority').value,
        category: document.getElementById('itemCategory').value,
        reminder: parseInt(document.getElementById('itemReminder').value)
    };
    
    if (type === 'task') {
        item.completed = false;
    } else if (type === 'assignment' || type === 'project') {
        item.status = 'pending';
    } else if (type === 'exam') {
        item.subject = item.description;
        item.location = 'TBD';
        item.duration = '2 hours';
    } else if (type === 'event') {
        item.location = 'TBD';
    }
    
    if (id) {
        updateItem(type, id, item);
    } else {
        addItem(type, item);
    }
    
    closeModal();
    renderPage(AppState.currentPage);
    updateDashboard();
}

function getItemById(type, id) {
    const collections = {
        task: AppState.tasks,
        assignment: AppState.assignments,
        exam: AppState.exams,
        project: AppState.projects,
        event: AppState.events
    };
    
    return collections[type].find(item => item.id === id);
}

function addItem(type, item) {
    const collections = {
        task: AppState.tasks,
        assignment: AppState.assignments,
        exam: AppState.exams,
        project: AppState.projects,
        event: AppState.events
    };
    
    collections[type].push(item);
    saveUserData();
    
    addNotification({
        title: 'Item Added',
        message: `${item.title} has been added successfully`,
        time: new Date()
    });
}

function updateItem(type, id, newData) {
    const collections = {
        task: AppState.tasks,
        assignment: AppState.assignments,
        exam: AppState.exams,
        project: AppState.projects,
        event: AppState.events
    };
    
    const index = collections[type].findIndex(item => item.id === id);
    if (index !== -1) {
        collections[type][index] = { ...collections[type][index], ...newData };
        saveUserData();
    }
}

function deleteItem(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const collections = {
        task: 'tasks',
        assignment: 'assignments',
        exam: 'exams',
        project: 'projects',
        event: 'events'
    };
    
    const collectionName = collections[type];
    AppState[collectionName] = AppState[collectionName].filter(item => item.id !== id);
    
    saveUserData();
    renderPage(AppState.currentPage);
    updateDashboard();
    
    addNotification({
        title: 'Item Deleted',
        message: 'Item has been removed successfully',
        time: new Date()
    });
}

function editItem(type, id) {
    openModal(type, id);
}

function toggleTask(id) {
    const task = AppState.tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveUserData();
        updateDashboard();
        renderTasksPage();
        renderTodayTasks();
        
        if (task.completed) {
            addNotification({
                title: 'Task Completed! 🎉',
                message: `Great job completing "${task.title}"`,
                time: new Date()
            });
        }
    }
}

// Notifications
function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const clearNotifications = document.getElementById('clearNotifications');
    
    notificationBtn.addEventListener('click', function() {
        notificationPanel.classList.toggle('active');
        renderNotifications();
    });
    
    clearNotifications.addEventListener('click', function() {
        AppState.notifications = [];
        renderNotifications();
    });
    
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationPanel.classList.remove('active');
        }
    });
}

function addNotification(notification) {
    AppState.notifications.unshift(notification);
    updateNotificationBadge();
}

function renderNotifications() {
    const container = document.getElementById('notificationList');
    
    if (AppState.notifications.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 2rem;">No notifications</p>';
        return;
    }
    
    container.innerHTML = AppState.notifications.map(notif => `
        <div class="notification-item ${notif.urgent ? 'urgent' : ''}">
            <div class="notification-title">${notif.title}</div>
            <div class="notification-message">${notif.message}</div>
            <div class="notification-time">${formatTimeAgo(notif.time)}</div>
        </div>
    `).join('');
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const count = AppState.notifications.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

function checkReminders() {
    const now = new Date();
    
    AppState.tasks.forEach(task => {
        if (task.completed || !task.reminder) return;
        
        const taskDate = new Date(task.date);
        const reminderTime = new Date(taskDate.getTime() - task.reminder * 60 * 1000);
        
        if (now >= reminderTime && now < taskDate) {
            const existingNotif = AppState.notifications.find(n => 
                n.message.includes(task.title) && n.title.includes('Reminder')
            );
            
            if (!existingNotif) {
                addNotification({
                    title: 'Reminder ⏰',
                    message: `Task "${task.title}" is due in ${task.reminder} minutes`,
                    time: new Date(),
                    urgent: task.priority === 'urgent' || task.priority === 'high'
                });
            }
        }
    });
}

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function formatDateTimeLocal(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatTimeAgo(date) {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInMins = Math.floor(diffInMs / 60000);
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}
