import Member from "../../models/Member.js";
import BiometricEnrollment from "./models/BiometricEnrollment.js";
import CheckIn from "./models/CheckIn.js";
import * as matchingService from "./matchingServiceClient.js";

// @desc    Enroll a member's fingerprint
// @route   POST /api/biometric/enroll
// @access  Public
export const enrollMember = async (req, res) => {
	try {
		const { memberId, fingerprintImage } = req.body;

		const member = await Member.findById(memberId);
		if (!member) {
			return res
				.status(404)
				.json({ success: false, message: "Member not found" });
		}

		const { matchingServiceId } = await matchingService.enrollTemplate(
			fingerprintImage
		);

		const enrollment = await BiometricEnrollment.create({
			member: memberId,
			matchingServiceId,
		});

		res.status(201).json({ success: true, data: enrollment });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Revoke a member's fingerprint enrollment
// @route   DELETE /api/biometric/enroll/:id
// @access  Public
export const revokeEnrollment = async (req, res) => {
	try {
		const enrollment = await BiometricEnrollment.findById(req.params.id);

		if (!enrollment) {
			return res
				.status(404)
				.json({ success: false, message: "Enrollment not found" });
		}

		await matchingService.revokeTemplate(enrollment.matchingServiceId);
		enrollment.status = "revoked";
		await enrollment.save();

		res.json({ success: true, data: enrollment });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Identify a member by fingerprint and log a check-in
// @route   POST /api/biometric/identify
// @access  Public
export const identifyAndCheckIn = async (req, res) => {
	try {
		const { fingerprintImage, type = "check-in" } = req.body;

		const match = await matchingService.identify(fingerprintImage);

		if (!match?.matchingServiceId) {
			return res
				.status(404)
				.json({ success: false, message: "Fingerprint not recognized" });
		}

		const enrollment = await BiometricEnrollment.findOne({
			matchingServiceId: match.matchingServiceId,
			status: "active",
		}).populate("member");

		if (!enrollment) {
			return res.status(404).json({
				success: false,
				message: "No active enrollment for this fingerprint",
			});
		}

		const checkIn = await CheckIn.create({
			member: enrollment.member._id,
			type,
		});

		res.status(201).json({
			success: true,
			data: { member: enrollment.member, checkIn },
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Get attendance log
// @route   GET /api/biometric/checkins
// @access  Public
export const getCheckIns = async (req, res) => {
	try {
		const { memberId, from, to } = req.query;

		let query = {};
		if (memberId) query.member = memberId;
		if (from || to) {
			query.timestamp = {};
			if (from) query.timestamp.$gte = new Date(from);
			if (to) query.timestamp.$lte = new Date(to);
		}

		const checkIns = await CheckIn.find(query)
			.populate("member", "firstName lastName")
			.sort({ timestamp: -1 });

		res.json({ success: true, data: checkIns });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
