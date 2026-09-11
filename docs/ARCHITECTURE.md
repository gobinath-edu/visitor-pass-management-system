# Architecture

## Backend request flow
Route -> authentication/authorization -> validation -> controller -> service -> model -> MongoDB

Controllers are intentionally thin. Domain/business rules live in the service layer.

## Domain model
- User: login identity and role.
- Employee: employee profile linked to a User.
- Visitor: reusable visitor identity/profile.
- Visit: individual visitor request/transaction.
- ActivityLog: immutable audit events for a visit.

## Security approach
JWT is stored in an HttpOnly cookie so application JavaScript does not directly read the token. Backend middleware remains authoritative for role checks.
