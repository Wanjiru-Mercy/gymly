import mongoose from "mongoose";

const biometricEnrollmentSchema = new mongoose.Schema(
	{
		member: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Member",
			required: true,
		},
		matchingServiceId: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: String,
			enum: ["active", "revoked"],
			default: "active",
		},
		enrolledAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const BiometricEnrollment = mongoose.model(
	"BiometricEnrollment",
	biometricEnrollmentSchema
);

export default BiometricEnrollment;
