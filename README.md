# Project: Ticketswift
Welcome to Your Project Name! This project involves multiple components, including a Flask web application and Vue.js frontend. To start the project, follow these steps:

# Prerequisites
Before you begin, ensure you have the following prerequisites installed:

Python 3.x
Redis (for Celery)
Node.js (for Vue.js)

# Getting Started

## Installation and Setup

1. Install all the required packages from the `requirement.txt` file using the following command:
   ```bash
   pip install -r requirement.txt

2. Start the backend server located in the backend folder, serving on port 3000:
   ```bash
   python backend/main.py

3. Start the Frontend server located in the frontend folder:
   ```bash
   python frontend/main.py

4. Start MailHog in Ubuntu.

5. Start Redis, then Celery worker, and finally Celery beat in Ubuntu.

6. Open your browser and navigate to http://127.0.0.1:5000 to access our frontend Vue.js app running on port 5000.

7. On this URL, the Flask-Vue app is now running. Sign up as a user, log in, and perform asynchronous jobs.

8. For admin login, use the following credentials:
   ```bash
   Email: "harsh@gmail.com"
   Password: "harsh"

   
