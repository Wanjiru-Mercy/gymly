import express from "express";
import {
	enrollMember,
	revokeEnrollment,
	identifyAndCheckIn,
	getCheckIns,
} from "./biometricController.js";

const router = express.Router();

router.post("/enroll", enrollMember);
router.delete("/enroll/:id", revokeEnrollment);
router.post("/identify", identifyAndCheckIn);
router.get("/checkins", getCheckIns);

export default router;
