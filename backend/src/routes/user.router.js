import { Router } from "express";
import {loginUser, registerUser, verifyUser, addToWishlist, removeFromWishlist, fetchOwner, unlockOwner, fetchWishes} from "../controllers/user.controller.js"

const router = Router();


router.route("/register-user").post(registerUser)
router.route("/unlock-owner").post(unlockOwner)
router.route("/verify-user").get(verifyUser)
router.route("/get-owner/:id").get(fetchOwner)
router.route("/get-wishes/:id").get(fetchWishes)
router.route("/login-user").post(loginUser)
router.route("/add-to-wishlist").post(addToWishlist)
router.route("/remove-from-wishlist").post(removeFromWishlist)

export default router