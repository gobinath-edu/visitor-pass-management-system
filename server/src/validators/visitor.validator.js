import { z } from "zod";

export const visitorCreateSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(20),
  email: z.string().email().optional().or(z.literal("")),
  idType: z.string().trim().max(40).optional(),
  idNumber: z.string().trim().max(80).optional(),
  company: z.string().trim().max(120).optional(),
  employeeId: z.string().min(1),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  expectedArrivalTime: z.string().regex(/^\d{2}:\d{2}$/),
  purpose: z.string().trim().min(3).max(500)
});

export const listVisitorsSchema = z.object({
  visitorName: z.string().trim().optional(),
  employeeName: z.string().trim().optional(),
  visitDate: z.string().optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
});

export const remarkSchema = z.object({
  remarks: z.string().trim().max(500).default("")
});
