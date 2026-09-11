import { Router } from "express";
import { list, updateStatus } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get("/", list);
router.patch("/:id/status", updateStatus);

export default router;
