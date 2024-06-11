import { Router } from "express";
import { createUser, getLogs, getStock, login } from "../controllers";
import { authenticate } from "../middleware/auth";

const router: Router = Router();

router.get("/stock", authenticate, getStock);
router.get("/logs", authenticate, getLogs);
router.post("/login", login);
router.post("/create-user", createUser);

export default router;
