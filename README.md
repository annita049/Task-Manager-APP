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

1. Clone the Repository:
   ```bash
   git clone https://github.com/annita049/Task-Manager-APP.git
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Run the Server with Nodemon:
   ```bash
   nodemon app.js
   ```
## API ENDPOINTS
## API Endpoints

| Method | Endpoint                   | Description                                                 |
| ------ | -------------------------- | ------------------------------------------                  |
| GET    | `/guest`                   | For guest users to get started                              |
| GET    | `/register`                | Gets the registration form for a new user                   |
| POST   | `/register`                | Registers a new user                                        |
| GET    | `/login`                   | Gets the user login form                                    |
| POST   | `/login`                   | Logs in an existing user                                    |
| GET    | `/home`                    | Retrieves the profile and task info of the logged-in user   |
| GET    | `/task/Completed`          | Retrives all the Completed tasks                            |
| POST   | `/task/In Progress`        | Retrives all the In Progress tasks                          |
| GET    | `/task/Pending`            | Retrives all the Pending                                    |
| GET    | `/task/Completed/search`   | Searches within the Completed tasks by task title           |
| GET    | `/task/In Progress/search` | Searches within the In Progress tasks by task title         |
| GET    | `/task/Pending/search`     | Searches within the Pending tasks category by task title    |
| GET    | `/task/Completed/sort`     | Sorts within the Completed tasks category by priority       |
| GET    | `/task/In Progress/sort`   | Sorts within the In Progress tasks category by priority     |
| GET    | `/task/Pending/sort`       | Sorts within the Pending tasks category by priority         |
| GET    | `/task/logout`             | Logs the user out of the app                                |
