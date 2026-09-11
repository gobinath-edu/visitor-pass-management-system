import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import { User } from "../models/User.model.js";
import { Employee } from "../models/Employee.model.js";
import { ROLES } from "../constants/roles.js";

await connectDatabase();

const passwordHash = await bcrypt.hash("Admin@123", 12);
const receptionPasswordHash = await bcrypt.hash("Reception@123", 12);
const employeePasswordHash = await bcrypt.hash("Employee@123", 12);

await User.deleteMany({});
await Employee.deleteMany({});

const admin = await User.create({
  name: "System Administrator",
  email: "admin@example.com",
  passwordHash,
  role: ROLES.ADMIN
});

await User.create({
  name: "Front Desk",
  email: "receptionist@example.com",
  passwordHash: receptionPasswordHash,
  role: ROLES.RECEPTIONIST
});

const employeeUser = await User.create({
  name: "Arun Kumar",
  email: "employee@example.com",
  passwordHash: employeePasswordHash,
  role: ROLES.EMPLOYEE
});

await Employee.create({
  user: employeeUser._id,
  employeeCode: "EMP001",
  department: "Engineering",
  phone: "9876543210"
});

console.log("Seed completed");
console.log("admin@example.com / Admin@123");
console.log("receptionist@example.com / Reception@123");
console.log("employee@example.com / Employee@123");

await mongoose.disconnect();
