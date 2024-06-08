import { Router } from "express";
import { getLogs, getStock } from "../controllers";

const router: Router = Router();

router.get("/stocks", getStock);
router.get("/logs", getLogs);

export default router;
