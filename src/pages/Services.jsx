import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const Services = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Services
					</h2>
					<p className="text-gray-600 mt-1">
						Manage gym classes, personal training, spa services, and
						more
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Service Offerings</CardTitle>
						<CardDescription>
							View and manage all services offered by your
							facility
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-500 text-center py-8">
							Services management content will be implemented here
						</p>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default Services;
