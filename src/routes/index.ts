import { Router } from "express";
import { createUser, getLogs, getStock, login } from "../controllers";

const router: Router = Router();

router.get("/stock", getStock);
router.get("/logs", getLogs);
router.get("/login", login);
router.post("/create-user", createUser);

export default router;
