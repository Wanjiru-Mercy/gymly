import Plan from "../models/Plan.js";

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
export const getPlans = async (req, res) => {
	try {
		const { status, category } = req.query;

		let query = {};

		if (status) query.status = status;
		if (category) query.category = category;

		const plans = await Plan.find(query).sort({ price: 1 });

		res.json({
			success: true,
			data: plans,
			total: plans.length,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Get single plan
// @route   GET /api/plans/:id
// @access  Public
export const getPlan = async (req, res) => {
	try {
		const plan = await Plan.findById(req.params.id);

		if (!plan) {
			return res
				.status(404)
				.json({ success: false, message: "Plan not found" });
		}

		res.json({ success: true, data: plan });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Public
export const createPlan = async (req, res) => {
	try {
		const plan = await Plan.create(req.body);
		res.status(201).json({ success: true, data: plan });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Public
export const updatePlan = async (req, res) => {
	try {
		const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!plan) {
			return res
				.status(404)
				.json({ success: false, message: "Plan not found" });
		}

		res.json({ success: true, data: plan });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Public
export const deletePlan = async (req, res) => {
	try {
		const plan = await Plan.findByIdAndDelete(req.params.id);

		if (!plan) {
			return res
				.status(404)
				.json({ success: false, message: "Plan not found" });
		}

		res.json({ success: true, message: "Plan deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
