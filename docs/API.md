# API

## Authentication
POST `/api/auth/login`
POST `/api/auth/logout`
GET  `/api/auth/me`

## Visitors / Visits
GET  `/api/visitors`
POST `/api/visitors`
GET  `/api/visitors/:id`
PATCH `/api/visitors/:id/cancel`
PATCH `/api/visitors/:id/check-in`
PATCH `/api/visitors/:id/check-out`

## Requests
GET `/api/requests`
PATCH `/api/requests/:id/approve`
PATCH `/api/requests/:id/reject`

## Employees
GET `/api/employees`
POST `/api/employees`
PATCH `/api/employees/:id`
DELETE `/api/employees/:id`

## Users
GET `/api/users`
PATCH `/api/users/:id/status`

## Reports
GET `/api/reports/summary`

## Activity
GET `/api/activity`
GET `/api/activity/visit/:visitId`
