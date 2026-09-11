# Database Design

## User
`name`, `email`, `passwordHash`, `role`, `isActive`

## Employee
`user`, `employeeCode`, `department`, `phone`, `isActive`

## Visitor
`fullName`, `phone`, `email`, `idType`, `idNumber`, `company`

## Visit
`visitor`, `employee`, `visitDate`, `expectedArrivalTime`, `purpose`, `status`, `checkInTime`, `checkOutTime`, `remarks`, actor references.

## ActivityLog
`visit`, `action`, `performedBy`, `performedAt`, `metadata`

Important indexes support date/status/employee filtering and active-visit checks.
