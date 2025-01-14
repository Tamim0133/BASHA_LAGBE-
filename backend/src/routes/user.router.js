import { Router } from "express";
import {loginUser, registerUser, verifyUser, addToWishlist, removeFromWishlist} from "../controllers/user.controller.js"

const router = Router();


router.route("/register-user").post(registerUser)
router.route("/verify-user").get(verifyUser)
router.route("/login-user").post(loginUser)
router.route("/add-to-wishlist").post(addToWishlist)
router.route("/remove-from-wishlist").post(removeFromWishlist)

export default router