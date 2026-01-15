import express from "express";
import {
	getEquipment,
	getEquipmentById,
	createEquipment,
	updateEquipment,
	deleteEquipment,
} from "../controllers/equipmentController.js";

const router = express.Router();

router.route("/").get(getEquipment).post(createEquipment);

router
	.route("/:id")
	.get(getEquipmentById)
	.put(updateEquipment)
	.delete(deleteEquipment);

export default router;
