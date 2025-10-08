import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const EquipmentManagement = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Equipment Management
					</h2>
					<p className="text-gray-600 mt-1">
						Track and manage gym equipment inventory and maintenance
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Equipment Inventory</CardTitle>
						<CardDescription>
							View all gym equipment and their status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-500 text-center py-8">
							Equipment management content will be implemented
							here
						</p>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default EquipmentManagement;
