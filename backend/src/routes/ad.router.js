import { Router } from "express";
import {insertAd} from "../controllers/ad.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();


// router.route("/insert-ad").post(upload.array('images', 10), insertAd)
router.route(
    '/insert-ad').post(
    upload.array('images', 10), insertAd
);
// router.post(
//     '/insert-ad',
//     upload.array('images', 10),
//     (req, res) => {
//         console.log('Files:', req.files);
//         console.log('Body:', req.body);

//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ error: 'No files uploaded' });
//         }

//         res.status(200).json({ message: 'Success', data: req.body });
//     }, insertAd
// );

export default router