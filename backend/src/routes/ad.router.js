import { Router } from "express";
import {insertAd} from "../controllers/ad.controller.js"

const router = Router();


router.route("/insert-ad").post(insertAd)

export default router