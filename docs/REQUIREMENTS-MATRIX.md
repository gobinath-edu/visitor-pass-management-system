# Requirements Matrix

| Assignment area | Implementation |
|---|---|
| Authentication | `/api/auth` + HttpOnly JWT cookie |
| Role-based navigation | `client/src/utils/permissions.js` + route guards |
| Backend authorization | `auth.middleware.js` + `role.middleware.js` |
| Admin | Dashboard, employees, users, reports, activity |
| Receptionist | Register, check-in, check-out, history |
| Employee | Requests, approve/reject, remarks |
| Visitor registration | Visitor profile + visit transaction |
| Business rules | `visitor.service.js` |
| Search/filtering | `/api/visitors` query parameters |
| Reports | `/api/reports/summary` |
| Activity history | `ActivityLog` + activity service |
| Responsive UI | Shared CSS layout/components |
