import Member from "../models/Member.js";

// @desc    Get all members
// @route   GET /api/members
// @access  Public
export const getMembers = async (req, res) => {
	try {
		const { status, search, page = 1, limit = 10 } = req.query;

		let query = {};

		// Filter by status
		if (status) {
			query.status = status;
		}

		// Search by name or email
		if (search) {
			query.$or = [
				{ firstName: { $regex: search, $options: "i" } },
				{ lastName: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
			];
		}

		const members = await Member.find(query)
			.populate("membershipPlan")
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 });

		const count = await Member.countDocuments(query);

		res.json({
			success: true,
			data: members,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			total: count,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Public
export const getMember = async (req, res) => {
	try {
		const member = await Member.findById(req.params.id).populate(
			"membershipPlan"
		);

		if (!member) {
			return res
				.status(404)
				.json({ success: false, message: "Member not found" });
		}

		res.json({ success: true, data: member });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Create new member
// @route   POST /api/members
// @access  Public
export const createMember = async (req, res) => {
	try {
		const member = await Member.create(req.body);
		res.status(201).json({ success: true, data: member });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Public
export const updateMember = async (req, res) => {
	try {
		const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!member) {
			return res
				.status(404)
				.json({ success: false, message: "Member not found" });
		}

		res.json({ success: true, data: member });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Public
export const deleteMember = async (req, res) => {
	try {
		const member = await Member.findByIdAndDelete(req.params.id);

		if (!member) {
			return res
				.status(404)
				.json({ success: false, message: "Member not found" });
		}

		res.json({ success: true, message: "Member deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
