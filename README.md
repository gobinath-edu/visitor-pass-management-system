# Visitor Pass Management System V2

A MERN-stack Visitor Pass Management System designed around the supplied interview task.

## Roles

- **Administrator** — dashboard, employee/user management, reports, and activity history.
- **Receptionist** — register visitors, view history, check approved visitors in/out.
- **Employee** — review and approve/reject visitor requests assigned to them.

## Core workflow

Receptionist creates a request → Employee approves/rejects → Receptionist checks in an approved visitor → Receptionist checks out → history and activity remain available.

## Business rules

The backend service layer is authoritative and enforces the ten assignment rules:

1. A visitor cannot have more than one active visit at a time.
2. A visitor cannot be registered more than once on the same date.
3. Past visit dates are rejected.
4. A visitor cannot be checked in unless the visit is approved.
5. An employee can have at most three pending requests.
6. Only the assigned employee can approve or reject a request.
7. Check-in is allowed only for approved visits.
8. Check-out is allowed only for checked-in visits.
9. Rejected/cancelled visits cannot be checked in.
10. Cancelled visits are excluded from active operational lists.

## Stack

- React 19 + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication with an HttpOnly cookie
- Zod request validation
- Axios
- Plain CSS
- Docker Compose

## Project structure

```text
client/
  src/
    app/
    components/
    context/
    guards/
    hooks/
    pages/
    services/
    styles/
    utils/
server/
  src/
    config/
    constants/
    controllers/
    middleware/
    models/
    routes/
    seed/
    services/
    utils/
    validators/
docs/
docker-compose.yml
```

## Local setup

### 1. Backend

Create `server/.env` from `server/.env.example` and set a strong `JWT_SECRET`.

Install dependencies:

```bash
cd server
npm install
```

Start the backend:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

The UI runs on `http://localhost:5173`.

The frontend defaults to `http://localhost:5000/api`, so a `client/.env` is optional for the default local setup.

### 3. Demo data

With MongoDB running locally:

```bash
cd server
npm run seed
```

Demo accounts:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `Admin@123` |
| Receptionist | `receptionist@example.com` | `Reception@123` |
| Employee | `employee@example.com` | `Employee@123` |

Change demo passwords before any real deployment.

## Docker

Docker Compose can run MongoDB, the API, and the production frontend together:

```bash
docker compose up --build -d
```

The application is available at `http://localhost:5173`.

To create the demo accounts in the Docker MongoDB:

```bash
docker compose run --rm server npm run seed
```

To stop the stack:

```bash
docker compose down
```

The MongoDB data is stored in the `visitor-mongo` Docker volume.

For production, use a strong `JWT_SECRET`, HTTPS, secure cookies, and a managed MongoDB deployment.

## Documentation

- `docs/API.md` — API endpoints
- `docs/DATABASE.md` — MongoDB collections and relationships
- `docs/ARCHITECTURE.md` — application architecture
- `docs/REQUIREMENTS-MATRIX.md` — requirement-to-implementation mapping
