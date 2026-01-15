import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Equipment name is required"],
			trim: true,
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			enum: ["cardio", "strength", "free-weights", "other"],
		},
		brand: {
			type: String,
			trim: true,
		},
		model: {
			type: String,
			trim: true,
		},
		serialNumber: {
			type: String,
			unique: true,
			sparse: true,
		},
		purchaseDate: {
			type: Date,
		},
		purchasePrice: {
			type: Number,
		},
		condition: {
			type: String,
			enum: ["excellent", "good", "fair", "poor", "out-of-service"],
			default: "good",
		},
		status: {
			type: String,
			enum: ["operational", "maintenance", "repair", "retired"],
			default: "operational",
		},
		location: {
			type: String,
			trim: true,
		},
		lastMaintenanceDate: {
			type: Date,
		},
		nextMaintenanceDate: {
			type: Date,
		},
		maintenanceSchedule: {
			type: String,
			enum: ["weekly", "monthly", "quarterly", "yearly"],
			default: "monthly",
		},
		notes: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;
