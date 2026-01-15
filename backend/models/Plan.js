import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Plan name is required"],
			trim: true,
		},

		price: {
			type: Number,
			required: [true, "Price is required"],
			min: 0,
		},
		duration: {
			type: String,
			required: [true, "Duration is required"],
		},

		status: {
			type: String,
			enum: ["active", "inactive", "archived"],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
