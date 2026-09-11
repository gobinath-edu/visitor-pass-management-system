export function validateVisitorForm(form) {
  const errors = {};

  if (form.fullName.trim().length < 2) errors.fullName = "Enter a valid visitor name";
  if (form.phone.trim().length < 5) errors.phone = "Enter a valid phone number";
  if (!form.employeeId) errors.employeeId = "Select an employee";
  if (!form.visitDate) errors.visitDate = "Select a visit date";
  if (!form.expectedArrivalTime) errors.expectedArrivalTime = "Select an arrival time";
  if (form.purpose.trim().length < 3) errors.purpose = "Enter the purpose of visit";

  return errors;
}
