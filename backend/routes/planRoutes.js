import express from "express";
import {
	getPlans,
	getPlan,
	createPlan,
	updatePlan,
	deletePlan,
} from "../controllers/planController.js";

const router = express.Router();

router.route("/").get(getPlans).post(createPlan);

router.route("/:id").get(getPlan).put(updatePlan).delete(deletePlan);

export default router;
