import { Router } from "express";
import { summary } from "../controllers/report.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.get("/summary", authenticate, authorize(ROLES.ADMIN), summary);

export default router;
