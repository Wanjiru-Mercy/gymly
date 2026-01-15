import Member from "../models/Member.js";
import Equipment from "../models/Equipment.js";
import Plan from "../models/Plan.js";

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Public
export const getDashboardStats = async (req, res) => {
	try {
		// Total members
		const totalMembers = await Member.countDocuments({ status: "active" });

		// Members joined this month
		const startOfMonth = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			1
		);
		const newMembersThisMonth = await Member.countDocuments({
			joinDate: { $gte: startOfMonth },
		});

		// Calculate growth rate (simplified - you can make this more complex)
		const lastMonthStart = new Date(
			new Date().getFullYear(),
			new Date().getMonth() - 1,
			1
		);
		const lastMonthEnd = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			0
		);
		const lastMonthMembers = await Member.countDocuments({
			joinDate: { $gte: lastMonthStart, $lte: lastMonthEnd },
		});

		const growthRate =
			lastMonthMembers > 0
				? (
						((newMembersThisMonth - lastMonthMembers) /
							lastMonthMembers) *
						100
				  ).toFixed(1)
				: 0;

		// Equipment stats
		const totalEquipment = await Equipment.countDocuments();
		const equipmentNeedingMaintenance = await Equipment.countDocuments({
			status: { $in: ["maintenance", "repair"] },
		});

		// Active plans
		const activePlans = await Plan.countDocuments({ status: "active" });

		res.json({
			success: true,
			data: {
				totalMembers,
				activeToday: Math.floor(totalMembers * 0.3), // Mock: 30% active today
				newMembersThisMonth,
				growthRate: `${growthRate}%`,
				totalEquipment,
				equipmentNeedingMaintenance,
				activePlans,
				monthlyRevenue: 0, // To be calculated from billing module
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// @desc    Get recent activities
// @route   GET /api/dashboard/activities
// @access  Public
export const getRecentActivities = async (req, res) => {
	try {
		const recentMembers = await Member.find()
			.sort({ createdAt: -1 })
			.limit(5)
			.select("firstName lastName createdAt");

		const activities = recentMembers.map((member) => ({
			type: "New member registered",
			member: `${member.firstName} ${member.lastName}`,
			time: member.createdAt,
		}));

		res.json({
			success: true,
			data: activities,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
