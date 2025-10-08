import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const Billing = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Billing
					</h2>
					<p className="text-gray-600 mt-1">
						Manage invoices, payments, and membership fees
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Billing Overview</CardTitle>
						<CardDescription>
							View recent transactions and outstanding payments
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-500 text-center py-8">
							Billing management content will be implemented here
						</p>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default Billing;
