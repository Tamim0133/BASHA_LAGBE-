import { Router } from "express";
import {insertLocations, getDivisions, getDistricts, getAreas, getSubAreas} from "../controllers/location.controller.js"

const router = Router();


router.route("/insert-locations").post(insertLocations)
router.route("/get-divisions").get(getDivisions)
router.route("/get-districts/:div").get(getDistricts)
router.route("/get-areas/:dist").get(getAreas)
router.route("/get-subareas/:area").get(getSubAreas)

export default router