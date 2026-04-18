# BeTechified Advanced: Personal Knowledge Base API

A production-ready RESTful API built with Node.js, Express, and MongoDB, designed to function as a "Second Brain" for note-taking and knowledge organization.

Live URL: [https://your-app-name.onrender.com]

Status: ![Deployed](https://img.shields.io/badge/Status-Deployed-success) ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue)

---

## | Project Overview

This backend provides full CRUD functionality for a Notion-style application. It features advanced querying capabilities including text search across titles and content, category filtering, sorting, and pagination.

## | Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB Atlas (Mongoose ODM)
- Validation: Joi / Mongoose Validation
- Hosting: Render.com

---

## | Installation & Setup

1.  **Clone the repository:**

        git clone https://github.com/Neekbillzz/Notes-API-Group-1-BD.git

2.  **Install dependencies:**

        npm install

3.  **Configure Environment Variables (Create a .env file):**

        PORT=3012

        MONGO_URI=MONGO_URI =mongodb://abidum2001_db_user:MIEiu5wMZDNxfyim@ac-brqijhl-shard-00-00.n2kab3s.mongodb.net:27017,ac-brqijhl-shard-00-01.n2kab3s.mongodb.net:27017,ac-brqijhl-shard-00-02.n2kab3s.mongodb.net:27017/?ssl=true&replicaSet=atlas-ib6109-shard-0&authSource=admin&appName=cluster0

4.  **Start the server:**

        npm start

5.  **Endpoints**

All requests should be made to the following base URL: 
https://your-app-name.onrender.com/api

### Notes Resource
| Method | Endpoint | Description | Query Parameters / Body |
| :--- | :--- | :--- | :--- |
| POST | /notes | Create a new note | Body: { title, content, category, tags } |
| GET | /notes | Fetch all notes | Query: page, limit, search, sort |
| GET | /notes/:id | Fetch a single note | Params: id |
| PUT | /notes/:id | Update an existing note | Body: { title, content, category, tags } |
| DELETE | /notes/:id | Remove a note | Params: id |

---

### Example Usage (Advanced Querying)

To search for notes about "Nodejs" in the "Backend" category, with pagination:

    GET /api/notes?search=nodejs&category=Backend&page=1&limit=5
---


## | API Reference & Postman Documentation

### 1. Create a Note (POST)

POST /api/notes

![Create Note Screenshot](./assets/create-note.png)  
_(Postman window showing a successful 201 Created response for a new note)_

---

### 2. Get All Notes (Advanced Querying)

GET /api/notes

Supports the following query parameters:

| Parameter | Description                 | Example            |
| :-------- | :-------------------------- | :----------------- |
| page      | Page number for pagination  | ?page=2            |
| limit     | Items per page              | ?limit=5           |
| search    | Text search (title/content) | ?search=javascript |
| sort      | Field to sort by            | ?sort=-createdAt   |

![Search Filter Screenshot](./assets/search-filter.png)  
_(Postman showing Search/Filter results with multiple notes)_

![Pagination Screenshot](./assets/pagination.png)  
_(Postman showing Pagination logic (e.g., page 1 of 2))_

---

### 3. Get Single Note (GET)

GET /api/notes/:id

### 4. Update Note (PUT)

PUT /api/notes/:id

![Update Note Screenshot](./assets/update-note.png)  
_(Postman showing a 200 OK update of a note's title or content)_

### 5. Delete Note (DELETE)

DELETE /api/notes/:id

---

## | Data Model

The Note schema is designed for performance with text indexing for search functionality.

json
{

"title": "String (Required, Indexed)",

"content": "String (Required, Indexed)",

"category": "String (Optional)",

"tags": "Array of Strings",

"createdAt": "Timestamp",

"updatedAt": "Timestamp"

}

## | Error Handling

The API implements standard HTTP status codes:

- 200 / 201 : Success

- 400 : Bad Request (Validation Failures)

- 404 : Not Found

- 500 : Internal Server Error

## | The Team (Group 1)

- ABILI NICHOLAS - Database Architecture & Documentation

       https://github.com/Neekbillzz/Notes-API-Group-1-BD

- JERRY - Logic Lead

       https://github.com/Neekbillzz/Notes-API-Group-1-BD

- SMOKEY - Quality & Security

      https://github.com/Neekbillzz/Notes-API-Group-1-BD

- ELLA - DevOps

       https://github.com/Neekbillzz/Notes-API-Group-1-BD
