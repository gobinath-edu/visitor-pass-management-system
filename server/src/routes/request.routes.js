import { Router } from "express";
import { list, approve, reject } from "../controllers/request.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { remarkSchema } from "../validators/visitor.validator.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(authenticate, authorize(ROLES.EMPLOYEE));

router.get("/", list);
router.patch("/:id/approve", validate(remarkSchema), approve);
router.patch("/:id/reject", validate(remarkSchema), reject);

export default router;
