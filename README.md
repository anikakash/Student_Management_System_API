# Student Management System API Documentation

## Overview

This project is an API for managing students and teachers within an educational institution. It allows teachers to register, authenticate, and perform CRUD operations on student records. Students can also authenticate and update their own information.

# Actors

1. **Teacher**: Authorized users who can manage student records.
2. **Student**: Users who can access and update their own information.

# Features

- Teacher Management
- Register
- Authenticate
- Add new students
- Update student information
- Delete student records

# Student Management

- Authenticate
- Update own information

# API Endpoints

## Teachers

- `POST /teachers/register`: Register a new teacher.
- `POST /teachers/login`: Authenticate a teacher.
- `POST /students`: Add a new student.
- `PUT /students/{student_id}`: Update student information.
- `DELETE /students/{student_id}`: Delete a student record.

## Students

- `POST /students/login`: Authenticate a student.
- `PUT /students/profile`: Update student's own information.

# Authentication

- Authentication for both teachers and students is handled using JSON Web Tokens (JWT).
- Teachers and students will receive a JWT upon successful login, which they should include in the headers of subsequent requests to authenticate themselves.


[post man document](https://documenter.getpostman.com/view/27776369/2sA3Bn6Y5W)