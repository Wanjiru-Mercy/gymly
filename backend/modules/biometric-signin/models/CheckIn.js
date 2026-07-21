import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
	{
		member: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Member",
			required: true,
		},
		type: {
			type: String,
			enum: ["check-in", "check-out"],
			default: "check-in",
		},
		method: {
			type: String,
			enum: ["biometric", "manual"],
			default: "biometric",
		},
		timestamp: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const CheckIn = mongoose.model("CheckIn", checkInSchema);

export default CheckIn;
