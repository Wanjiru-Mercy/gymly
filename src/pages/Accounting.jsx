import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const Accounting = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Accounting
					</h2>
					<p className="text-gray-600 mt-1">
						Track revenue, expenses, and financial reports
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Financial Overview</CardTitle>
						<CardDescription>
							View financial summary and reports
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-500 text-center py-8">
							Accounting content will be implemented here
						</p>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default Accounting;
