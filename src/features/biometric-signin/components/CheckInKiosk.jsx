import React, { useState } from "react";
import { Fingerprint, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import biometricApi from "../api";
import { useFingerprintReader } from "../hooks/useFingerprintReader";

const CheckInKiosk = () => {
	const [result, setResult] = useState(null);
	const { capture, isCapturing } = useFingerprintReader();

	const handleScan = async () => {
		setResult(null);

		try {
			const fingerprintImage = await capture();
			const response = await biometricApi.identify(fingerprintImage);
			setResult({ type: "success", member: response.data.member });
		} catch (error) {
			setResult({ type: "error", message: error.message });
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-6 bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
			<Fingerprint className="h-20 w-20 text-primary" />
			<div>
				<h2 className="text-xl font-semibold text-gray-900">
					Scan to Check In
				</h2>
				<p className="text-sm text-gray-600 mt-1">
					Place your finger on the scanner
				</p>
			</div>

			<Button size="lg" onClick={handleScan} disabled={isCapturing}>
				{isCapturing && (
					<Loader2 className="h-4 w-4 mr-2 animate-spin" />
				)}
				Scan Fingerprint
			</Button>

			{result?.type === "success" && (
				<p className="text-green-600 font-medium">
					Welcome, {result.member.firstName}!
				</p>
			)}
			{result?.type === "error" && (
				<p className="text-red-600">{result.message}</p>
			)}
		</div>
	);
};

export default CheckInKiosk;
