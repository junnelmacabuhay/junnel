Got it 👍 You want the **full system specifications for your entire EduFlow Study Planner App**, not just login. Below is a **complete and clean specification** you can use for your documentation, thesis, or project report.

---

# 📘 EduFlow Study Planner – System Specifications

## 1. System Overview

EduFlow Study Planner is a web-based application designed to help students organize their study tasks, track progress, and manage academic schedules. The system allows users to create study tasks, monitor their progress, and manage personal settings through a simple and interactive dashboard.

The application uses a **frontend interface built with HTML, CSS, and JavaScript**, and a **backend developed using NestJS with a MySQL database**.

---

# 2. System Features

## 2.1 User Authentication

The system provides secure user authentication that allows students to register and log in to their accounts.

### Registration

Users can create a new account by providing:

* Username
* Email address
* Password

The system stores the password using **bcrypt encryption** to ensure security.

### Login

Registered users can log in using their username and password.
If the credentials are correct, the system redirects the user to the dashboard.

### Logout

Users can log out of the system and return to the login page.

---

# 2.2 Dashboard

The dashboard serves as the main interface of the application where users can view their study progress and task overview.

Dashboard components include:

* Task progress overview
* Statistics visualization using charts
* Quick navigation menu

The dashboard uses **Chart.js** to visualize task completion statistics.

---

# 2.3 Task Management

Users can manage their study tasks within the application.

### Add Task

Users can create a new task with the following details:

* Task Title
* Subject
* Date and Time
* Reviewer File Upload
* Task Status

### Task Status

Each task can have the following statuses:

| Status    | Description                         |
| --------- | ----------------------------------- |
| Pending   | Task is not yet completed           |
| Completed | Task has been successfully finished |
| Wrong     | Task was attempted but incorrect    |

Tasks are displayed with **color-coded labels** for easy identification.

---

# 2.4 Calendar Integration

The system includes a calendar interface where users can view scheduled tasks and study sessions according to selected dates.

---

# 2.5 User Profile

Users can manage their personal profile information.

Profile features include:

* Display username
* Display email
* Avatar or profile image
* Edit profile information

---

# 2.6 System Settings

Users can customize application preferences.

Settings include:

### Theme Settings

* Light Mode
* Dark Mode

### Notification Settings

* Enable or disable reminders for upcoming tasks.

---

# 3. System Architecture

The application follows a **client-server architecture**.

```
Frontend (HTML, CSS, JavaScript)
          ↓
REST API (NestJS Backend)
          ↓
Database (MySQL / phpMyAdmin)
```

---

# 4. Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* Chart.js

## Backend

* NestJS (Node.js framework)
* TypeORM

## Database

* MySQL
* phpMyAdmin

## Security

* bcrypt (password hashing)
* REST API authentication

---

# 5. System File Structure

```
my-app
│
├── frontend
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── tasks.html
│   ├── profile.html
│   ├── settings.html
│   ├── calendar.html
│   ├── styles.css
│   └── script.js
│
├── src
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   │
│   ├── user
│   │   ├── user.entity.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   │
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── main.ts
```

---

# 6. API Endpoints

### User Registration

```
POST /auth/signup
```

Request body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

---

### User Login

```
POST /auth/login
```

Request body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful"
}
```

---

### Task Creation

```
POST /tasks
```

---

### Get Tasks

```
GET /tasks
```

---

### Get Profile

```
GET /profile
```

---

# 7. Database Structure

### Users Table

| Field    | Type    | Description        |
| -------- | ------- | ------------------ |
| id       | INT     | Primary Key        |
| username | VARCHAR | User login name    |
| email    | VARCHAR | User email         |
| password | VARCHAR | Encrypted password |

---

### Tasks Table

| Field    | Type     | Description                 |
| -------- | -------- | --------------------------- |
| id       | INT      | Primary Key                 |
| title    | VARCHAR  | Task title                  |
| subject  | VARCHAR  | Subject name                |
| datetime | DATETIME | Task schedule               |
| status   | VARCHAR  | Pending / Completed / Wrong |
| user_id  | INT      | Linked user                 |

---

# 8. Future Enhancements

The system can be improved by adding the following features:

* Mobile responsive interface
* Task priority levels
* Push notifications
* File storage for reviewers
* Study analytics reports
* AI-powered study suggestions

