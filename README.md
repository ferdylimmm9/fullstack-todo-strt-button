# Task Management App

A full-stack task management application built with Next.js, Prisma, and various modern web technologies. This app allows users to register, log in, manage tasks, and perform operations like creating, updating, and deleting tasks.
![Alt Text](https://fullstack-todo-strt-button.vercel.app/preview/preview-00001.png)
![Alt Text](https://fullstack-todo-strt-button.vercel.app/preview/preview-00002.png)
![Alt Text](https://fullstack-todo-strt-button.vercel.app/preview/preview-00003.png)
![Alt Text](https://fullstack-todo-strt-button.vercel.app/preview/preview-00004.png)
![Alt Text](https://fullstack-todo-strt-button.vercel.app/preview/preview-00005.png)
![Alt Text](https://fullstack-todo-strt-button.vercel.app/preview/preview-00006.png)
---

## Tech Stack

- **Frontend:**
  - **Next.js**: React framework for building the application with server-side rendering (SSR) and static site generation (SSG).
  - **Axios**: HTTP client to make API requests.
  - **React Query**: Network state management and data fetching for frontend.
  - **Tailwind CSS**: Utility-first CSS framework for styling components.
  - **TypeScript**: Type safety for the entire project.
  
- **Backend:**
  - **Prisma**: ORM for interacting with the database.
  - **bcrypt**: For hashing user passwords.
  - **JWT (JSON Web Tokens)**: For authentication and session management.
  - **Zod**: Data validation library used for validating incoming requests and data.

---

## Features

### Backend API

1. **GET** `/api/auth/me`  
   - Get current user information.
   - **Response:** User object with details (e.g., name, email).

2. **POST** `/api/auth/sign-in`  
   - Sign in and get a session token.
   - **Body:** `{ "email": "admin@admin.com", "password": "secret123" }`
   - **Response:** `{ "token": "JWT_TOKEN" }`

3. **POST** `/api/auth/sign-up`  
   - Register a new user.
   - **Body:**
    ```json
     {
       "name": "admin",
       "email": "Task Description",
       "password": "Task Description",
       "passwordConfirmation": "Task Description"
     }
     ```
   - **Response:** `{ "message": "User successfully registered" }`

4. **GET** `/api/tasks`  
   - Get tasks by current user with support for pagination, filtering, and sorting.
   - **Query Params:**
     - `page` (number, optional) - Page number for pagination.
     - `limit` (number, optional) - Number of tasks per page, `-1` means get all tasks.
     - `created_at` (string, optional) - Sorting by creation date (`asc` or `desc`).
     - `status` (string, optional) - Filter by task status (`pending` or `completed`).
   - **Response:** List of tasks.

5. **GET** `/api/tasks/[id]`  
   - Get detailed information about a specific task.
   - **Response:** Task object.

6. **POST** `/api/tasks`  
   - Create a new task.
   - **Body:** 
     ```json
     {
       "name": "Task Name",
       "description": "Task Description",
       "status": "pending"
     }
     ```
   - **Response:** Created task object.

7. **PUT** `/api/tasks/[id]`  
   - Update an existing task by ID.
   - **Body:** 
     ```json
     {
       "name": "Updated Task Name",
       "description": "Updated Task Description",
       "status": "completed"
     }
     ```
   - **Response:** Updated task object.

8. **DELETE** `/api/tasks/[id]`  
   - Delete a task by ID.
   - **Response:** Message indicating success.

### Backend Features

- **User-based Resource Limitation:** Tasks can only be modified or deleted by the user who created them. Unauthorized access results in a **403 Forbidden** error.
- **Pagination:** API supports pagination for retrieving task lists efficiently. 
- **Filtering:** Tasks can be filtered by their `status` (pending/completed).
- **Sorting:** Tasks can be sorted by `created_at` date in ascending or descending order.
- **Data Validation with Zod:** All incoming requests are validated using Zod schemas to ensure data integrity.
- **Password Hashing:** User passwords are securely hashed using bcrypt before being stored in the database.

### Frontend Features

- **Token Storage:** Authentication tokens are stored in cookies for session persistence across pages.
- **Virtualized Task List:** The task list is virtualized for performance optimization, especially when displaying large datasets.
- **Infinite Scroll:** Tasks load dynamically as the user scrolls down, reducing the need for pagination.
- **React Query:** Used for efficient data fetching, caching, and network state management.
- **Tailwind CSS:** Tailwind is used for component styling to quickly design responsive and visually appealing UI elements.