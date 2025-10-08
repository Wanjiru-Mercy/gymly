import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";

const MemberManagement = () => {
	const stats = [
		{ title: "Total Members", value: "1,234", icon: Users, color: "blue" },
		{
			title: "New This Month",
			value: "48",
			icon: UserPlus,
			color: "green",
		},
		{
			title: "Active Members",
			value: "1,156",
			icon: UserCheck,
			color: "purple",
		},
		{ title: "Inactive", value: "78", icon: UserX, color: "orange" },
	];

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Member Management
					</h2>
					<p className="text-gray-600 mt-1">
						Manage your gym members and memberships
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={stat.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<Card className="hover:shadow-md transition-shadow">
									<CardContent className="p-6">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium text-gray-600">
													{stat.title}
												</p>
												<h3 className="text-2xl font-bold text-gray-900 mt-1">
													{stat.value}
												</h3>
											</div>
											<div
												className={`p-3 rounded-full bg-${stat.color}-100`}
											>
												<Icon
													className={`h-6 w-6 text-${stat.color}-600`}
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>

				{/* Placeholder Content */}
				<Card>
					<CardHeader>
						<CardTitle>Member List</CardTitle>
						<CardDescription>
							View and manage all gym members
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-500 text-center py-8">
							Member list content will be implemented here
						</p>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default MemberManagement;
