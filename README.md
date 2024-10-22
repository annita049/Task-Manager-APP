# Task Manager Web Application

A web-based task management application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. This app allows users to create, update, and delete tasks, categorize tasks by status, and sorted by priority , manages user profiles with authentication and authorization.

## Features

- Responsive user interface with EJS templating
- User Registration and Login with secure authentication
- Password reset request via email and OTP verification
- Create, update, and delete tasks in homepage
- Task categorization by status (Completed, Pending, In Progress)
- Sort tasks by priority (High, Medium, Low)
- Search tasks by title within a status or across all tasks
- User authentication using JWT tokens
- Task statistics and task count feature

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **Email Service**: OTP generation and email delivery using NodeMailer
- **Middleware**: Authentication middleware for route protection

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/annita049/Task-Manager-APP.git
