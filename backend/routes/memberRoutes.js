import express from "express";
import {
	getMembers,
	getMember,
	createMember,
	updateMember,
	deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.route("/").get(getMembers).post(createMember);

router.route("/:id").get(getMember).put(updateMember).delete(deleteMember);

export default router;
