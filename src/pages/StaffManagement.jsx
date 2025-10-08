import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const StaffManagement = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Staff Management
					</h2>
					<p className="text-gray-600 mt-1">
						Manage trainers, instructors, and staff members
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Staff Directory</CardTitle>
						<CardDescription>
							View and manage all staff members
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-500 text-center py-8">
							Staff management content will be implemented here
						</p>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default StaffManagement;
