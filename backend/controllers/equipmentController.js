import Equipment from "../models/Equipment.js";

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Public
export const getEquipment = async (req, res) => {
	try {
		const { category, status, condition } = req.query;

		let query = {};

		if (category) query.category = category;
		if (status) query.status = status;
		if (condition) query.condition = condition;

		const equipment = await Equipment.find(query).sort({ createdAt: -1 });

		res.json({
			success: true,
			data: equipment,
			total: equipment.length,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Get single equipment
// @route   GET /api/equipment/:id
// @access  Public
export const getEquipmentById = async (req, res) => {
	try {
		const equipment = await Equipment.findById(req.params.id);

		if (!equipment) {
			return res
				.status(404)
				.json({ success: false, message: "Equipment not found" });
		}

		res.json({ success: true, data: equipment });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Create new equipment
// @route   POST /api/equipment
// @access  Public
export const createEquipment = async (req, res) => {
	try {
		const equipment = await Equipment.create(req.body);
		res.status(201).json({ success: true, data: equipment });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Update equipment
// @route   PUT /api/equipment/:id
// @access  Public
export const updateEquipment = async (req, res) => {
	try {
		const equipment = await Equipment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!equipment) {
			return res
				.status(404)
				.json({ success: false, message: "Equipment not found" });
		}

		res.json({ success: true, data: equipment });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// @desc    Delete equipment
// @route   DELETE /api/equipment/:id
// @access  Public
export const deleteEquipment = async (req, res) => {
	try {
		const equipment = await Equipment.findByIdAndDelete(req.params.id);

		if (!equipment) {
			return res
				.status(404)
				.json({ success: false, message: "Equipment not found" });
		}

		res.json({ success: true, message: "Equipment deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
