## AI-Powered Learning Tracker

This is a backend service built using Node.js, Express, PostgreSQL, and OpenRouter's DeepSeek R1 model to help users track their learning topics, generate summaries using AI, and analyze study progress over time.

---

## Key Features:

- Built RESTful APIs to manage users, topics, and study sessions.

- Integrated AI-generated study summaries using the DeepSeek R1 model through OpenRouter.

- Implemented PostgreSQL triggers to automatically update topic study time whenever a new study session is logged.

- Used JSONB columns and GIN indexing to support flexible and high-performance filtering based on topic tags.
  
---

## Project Structure:

- The server is built using Express and runs on Node.js.

- PostgreSQL is used for all data storage, with proper schema design, indexing, and triggers.

- OpenRouter API is used to call the DeepSeek R1 model for AI-generated content.

---

## How to Run:

- Clone the repository using git clone https://github.com/PRATHYUSHCC/learningtracker.git

- cd learningtracker
- npm install (to install all dependencies)

- Ensure you have PostgreSQL running and accessible.

- Create a .env file as provided as in .env.example

- Start the server using npm start or nodemon server.js 

The server will run on port 5000 or the port you specify in your .env file.

---

## Testing
You can test the working of the project using Postman.

- Use POST requests to add users and study topics.

- Send study data to the appropriate endpoint to log time.

- Trigger summary generation using a request to the summary endpoint.

- Receive AI-generated responses from the DeepSeek R1 model via OpenRouter.

---

## Example 

#  1. Create a User
Endpoint:

POST http://localhost:3000/users

Body (JSON):

json

{
  "name": "Alice",
  "email": "alice@example.com"
}

- The expected response will be
- {
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"

}

# 2 .Topic endpoint
- {
  "user_id": 1,
  "name": "Math - Calculus",
  "tags": ["math", "calculus", "integration"]
  }
- with response like
- {
  "id": 1,
  "userid": 1,
  "name": "Math - Calculus",
  "tags": ["math", "calculus", "integration"]

}

# 3 .Study session that triggers AI summary

- {
  "topicid": 1,
  "notes": "Derivatives and integrals were covered with examples",
  "duration": 45
  }
- response like
- {
  "id": 1,
  "topicid": 1,
  "notes": "Derivatives and integrals were covered with examples",
  "summary": "your ai summary will be generated here",
  "duration": 45
}
