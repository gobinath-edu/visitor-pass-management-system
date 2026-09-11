import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Employee } from "../models/Employee.model.js";
import { ROLES } from "../constants/roles.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage, sendSuccess } from "../utils/response.js";

export const list = asyncHandler(async (_req, res) => {
  const employees = await Employee.find()
    .populate("user", "name email role isActive")
    .sort({ createdAt: -1 });

  sendSuccess(res, { employees });
});

export const create = asyncHandler(async (req, res) => {
  const { name, email, password, employeeCode, department, phone } = req.body;

  const existing = await User.exists({ email });
  if (existing) throw new ApiError(409, "Email is already in use");

  const existingCode = await Employee.exists({ employeeCode: employeeCode.toUpperCase() });
  if (existingCode) throw new ApiError(409, "Employee code is already in use");

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: ROLES.EMPLOYEE
  });

  const employee = await Employee.create({
    user: user._id,
    employeeCode,
    department,
    phone
  });

  sendSuccess(res, {
    employee: await employee.populate("user", "name email role isActive")
  }, 201);
});

export const update = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate("user");

  if (!employee) throw new ApiError(404, "Employee not found");

  if (req.body.name !== undefined) employee.user.name = req.body.name;
  if (req.body.department !== undefined) employee.department = req.body.department;
  if (req.body.phone !== undefined) employee.phone = req.body.phone;
  if (req.body.isActive !== undefined) {
    employee.isActive = req.body.isActive;
    employee.user.isActive = req.body.isActive;
  }

  await employee.user.save();
  await employee.save();

  sendSuccess(res, {
    employee: await employee.populate("user", "name email role isActive")
  });
});

export const remove = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) throw new ApiError(404, "Employee not found");

  employee.isActive = false;
  await employee.save();

  await User.findByIdAndUpdate(employee.user, { isActive: false });

  sendMessage(res, "Employee deactivated");
});
