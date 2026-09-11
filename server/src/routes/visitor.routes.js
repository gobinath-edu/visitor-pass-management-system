import { Router } from "express";
import {
  create,
  list,
  getById,
  checkIn,
  checkOut,
  cancel,
  dashboardStats
} from "../controllers/visitor.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  visitorCreateSchema,
  listVisitorsSchema
} from "../validators/visitor.validator.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(authenticate);

router.get("/dashboard-stats", dashboardStats);
router.get("/", validate(listVisitorsSchema, "query"), list);
router.post("/", authorize(ROLES.RECEPTIONIST), validate(visitorCreateSchema), create);
router.get("/:id", getById);
router.patch("/:id/check-in", authorize(ROLES.RECEPTIONIST), checkIn);
router.patch("/:id/check-out", authorize(ROLES.RECEPTIONIST), checkOut);
router.patch("/:id/cancel", authorize(ROLES.RECEPTIONIST, ROLES.ADMIN), cancel);

export default router;
