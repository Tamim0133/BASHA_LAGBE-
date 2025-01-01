import { Router } from "express";
import {insertAd, getAds} from "../controllers/ad.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();


router.route("/get-ad").get(getAds)
router.route(
    '/insert-ad').post(
    upload.array('images', 10), insertAd
);


export default router