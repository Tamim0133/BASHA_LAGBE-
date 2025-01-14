import { Router } from "express";
import {insertAd, getAds, getOne} from "../controllers/ad.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();


router.route("/get-ad").get(getAds)
router.route("/get-one/:id").get(getOne)
router.route(
    '/insert-ad').post(
    upload.array('images', 10), insertAd
);


export default router