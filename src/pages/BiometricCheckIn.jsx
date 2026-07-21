import React from "react";
import { CheckInKiosk } from "@/features/biometric-signin";

const BiometricCheckIn = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md">
				<CheckInKiosk />
			</div>
		</div>
	);
};

export default BiometricCheckIn;
