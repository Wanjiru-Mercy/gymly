import React from "react";
import { ExternalLink } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { EnrollmentForm, AttendanceLog } from "@/features/biometric-signin";

const BiometricSignIn = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							Biometric Sign-In
						</h1>
						<p className="text-gray-600 mt-1">
							Enroll member fingerprints and review check-in
							activity
						</p>
					</div>

					<Button asChild variant="outline">
						<a
							href="/biometric-signin/checkin"
							target="_blank"
							rel="noopener noreferrer"
						>
							<ExternalLink className="h-4 w-4 mr-2" />
							Open Check-In Kiosk
						</a>
					</Button>
				</div>

				<EnrollmentForm />
				<AttendanceLog />
			</div>
		</DashboardLayout>
	);
};

export default BiometricSignIn;
