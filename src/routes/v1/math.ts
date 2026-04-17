import { Router } from "express";
import { getDouble, addNumbers, multiply } from "../../controllers/math";

const router = Router();

// Specific routes FIRST
router.get("/add", addNumbers);
router.post("/multiply", multiply);

// Dynamic route LAST
router.get("/:num", getDouble);

export default router;
