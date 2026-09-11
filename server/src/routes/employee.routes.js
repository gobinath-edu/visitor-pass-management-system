import { Router } from "express";
import { list, create, update, remove } from "../controllers/employee.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  employeeCreateSchema,
  employeeUpdateSchema
} from "../validators/employee.validator.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get("/", list);
router.post("/", validate(employeeCreateSchema), create);
router.patch("/:id", validate(employeeUpdateSchema), update);
router.delete("/:id", remove);

export default router;
