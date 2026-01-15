import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		phone: {
			type: String,
			required: [true, "Phone number is required"],
		},
		dateOfBirth: {
			type: Date,
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
		},
		address: {
			street: String,
			city: String,
			state: String,
			zipCode: String,
		},
		membershipPlan: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plan",
		},
		joinDate: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["active", "inactive", "suspended"],
			default: "active",
		},
		emergencyContact: {
			name: String,
			phone: String,
			relationship: String,
		},
		photo: {
			type: String,
		},
		notes: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
