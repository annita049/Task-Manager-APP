# Task Manager Web Application

A web-based task management application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. This app allows users to create, update, and delete tasks, categorize tasks by status, and manage user profiles with authentication and authorization.

## Features

- User Registration and Login with secure authentication
- Email verification with OTP
- Password reset request via email
- Create, update, and delete tasks
- Task categorization by status (Completed, Pending, In Progress)
- Sort tasks by priority (High, Medium, Low)
- Search tasks by title within a status or across all tasks
- Profile update functionality
- User authentication using JWT tokens
- Task statistics and task count feature
- Responsive user interface with EJS templating

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **Email Service**: OTP generation and email delivery using NodeMailer
- **Middleware**: Authentication middleware for route protection

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
