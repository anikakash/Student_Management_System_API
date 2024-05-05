# Backend Project Documentation

This documentation provides an overview of the backend project implemented using Node.js, Express.js, and MongoDB. The project includes authentication, role-based access control, and functionalities for managing teachers and students.

## Features

1. **JWT Login/Registration**: Implements JSON Web Token (JWT) based authentication for teachers.
2. **Role-Based API Access**: Supports role-based access control for different API endpoints.
3. **Super Admin (Head Teacher)**: A super admin role that can create other teachers and manage students.
4. **Teacher Functionality**: Teachers can update only the students they have added.

## Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/teacher/register`

Registers a new teacher.

- **Required Role**: Super Admin (Head Teacher)
- **Request Body**: 
  - `name`: Name of the teacher.
  - `email`: Email address of the teacher.
  - `password`: Password for the teacher account.
  - `department`: Department of the teacher.
- **Response**: 
  - `Message`: Success message.

#### POST `/teacher/login`

Logs in a teacher.

- **Request Body**: 
  - `email`: Email address of the teacher.
  - `password`: Password for the teacher account.
- **Response**: 
  - `jwtToken`: JWT token for authentication.
  - `tokenObject`: Teacher information.

### Teacher Routes (`/api/teacher-info`)

#### GET `/teachers`

Retrieves a list of all teachers.

- **Required Role**: Super Admin (Head Teacher)
- **Response**: 
  - Array of teacher objects.

#### GET `/my-profile`

Retrieves the profile of the logged-in teacher.

- **Required Role**: Teacher
- **Response**: 
  - Teacher object.

#### PATCH `/update-myinfo`

Updates the profile information of the logged-in teacher.

- **Required Role**: Teacher
- **Request Body**: 
  - Updated teacher information.
- **Response**: 
  - Updated teacher object.

### Student Routes (`/api/info`)

#### GET `/students`

Retrieves a list of all students.

- **Required Role**: Super Admin (Head Teacher)
- **Response**: 
  - Array of student objects.

#### GET `/advising-students`

Retrieves a list of students advised by the logged-in teacher.

- **Required Role**: Teacher
- **Response**: 
  - Array of student objects.

#### GET `/student/:id`

Retrieves the information of a specific student by ID.

- **Required Role**: Super Admin (Head Teacher)
- **Response**: 
  - Student object.

#### POST `/create-student`

Adds a new student.

- **Required Role**: Super Admin (Head Teacher)
- **Request Body**: 
  - Student information.
- **Response**: 
  - Created student object.

#### PATCH `/update-student/:id`

Updates the information of a specific student by ID.

- **Required Role**: Super Admin (Head Teacher) or Teacher who added the student
- **Request Body**: 
  - Updated student information.
- **Response**: 
  - Updated student object.

#### DELETE `/remove-student/:id`

Deletes a specific student by ID.

- **Required Role**: Super Admin (Head Teacher)
- **Response**: 
  - Success message.

## Middleware

### Authentication Middleware (`authenticator.middleware.js`)

- **ensureAuthenticated**: Verifies JWT token for authentication.
- **ensureRole**: Checks if the user has the required role for accessing certain endpoints.

### Validation Middleware (`teacher.middleware.js`)

- **teacherRegistrationValidate**: Validates the input data for teacher registration.
- **teacherLoginValidate**: Validates the input data for teacher login.

## Controllers

### `teacher.controller.js`

- **teacherRegistration**: Handles teacher registration by hashing password and saving the teacher data.
- **teacherLogin**: Handles teacher login and generates JWT token.
- **getTeachers**: Retrieves a list of all teachers.
- **getLoggedInTeacherInfo**: Retrieves the profile of the logged-in teacher.
- **updateLoggedInTeacherInfo**: Updates the profile information of the logged-in teacher.

### `student.controller.js`

- **addStudent**: Adds a new student associated with the logged-in teacher.
- **getStudentsByTeacher**: Retrieves a list of students advised by the logged-in teacher.
- **getStudents**: Retrieves a list of all students.
- **getStudent**: Retrieves the information of a specific student by ID.
- **updateStudent**: Updates the information of a specific student by ID.
- **deleteStudent**: Deletes a specific student by ID.

## Configuration

The project utilizes MongoDB as the database. Ensure to set up the database connection and environment variables such as `SECRET` for JWT token encryption.

## Note

- This documentation provides an overview of the backend project, including endpoints, middleware, controllers, and configuration details.
- Additional adjustments or improvements can be made based on specific project requirements or future updates.

Feel free to modify or expand this documentation according to your project's needs. Let me know if you need further assistance!



[post man document](https://documenter.getpostman.com/view/27776369/2sA3Bn6Y5W)