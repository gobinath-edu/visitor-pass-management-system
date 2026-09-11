# Visitor Pass Management System V2

A MERN-stack Visitor Pass Management System designed around the supplied interview task.

## Roles
- Administrator
- Receptionist
- Employee

## Core workflow
Receptionist creates request -> Employee approves/rejects -> Receptionist checks in approved visitor -> Receptionist checks out -> history/activity retained.

## Business rules
The backend service layer enforces all ten assignment rules. The frontend provides UX validation, but the API remains authoritative.

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication using an HttpOnly cookie
- Zod validation
- Axios
- Plain CSS for a lightweight professional UI

## Local setup
1. Create `server/.env` from `server/.env.example`.
2. Create `client/.env` from `client/.env.example`.
3. Install dependencies in root/client/server.
4. Start MongoDB.
5. Run `npm run server` and `npm run client` in separate terminals.
6. Run the seed command to create demo accounts.

## Demo accounts
- admin@example.com / Admin@123
- receptionist@example.com / Reception@123
- employee@example.com / Employee@123

Change demo passwords before any real deployment.

## Deployment
Deploy the client to Vercel/Netlify and the server to a Node-compatible host. Set the environment variables from the examples and use MongoDB Atlas for production.
