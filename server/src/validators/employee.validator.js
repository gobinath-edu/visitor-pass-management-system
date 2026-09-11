import { z } from "zod";

export const employeeCreateSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  employeeCode: z.string().trim().min(2).max(30),
  department: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(20).optional()
});

export const employeeUpdateSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  department: z.string().trim().min(2).max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  isActive: z.boolean().optional()
});
