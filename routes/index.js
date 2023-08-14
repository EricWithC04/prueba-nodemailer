import { Router } from "express";
import { routeSendEmail } from "../controllers";

const router = Router()

router.post("/email", routeSendEmail)

export default router