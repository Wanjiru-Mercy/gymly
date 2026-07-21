import React, { useEffect, useState } from "react";
import { Fingerprint, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import biometricApi from "../api";
import { useFingerprintReader } from "../hooks/useFingerprintReader";

const EnrollmentForm = ({ initialMemberEmail }) => {
	const [members, setMembers] = useState([]);
	const [selectedMemberId, setSelectedMemberId] = useState("");
	const [status, setStatus] = useState(null);
	const { capture, isCapturing } = useFingerprintReader();

	useEffect(() => {
		api
			.getMembers()
			.then((res) => {
				setMembers(res.data);
				if (initialMemberEmail) {
					const match = res.data.find(
						(member) =>
							member.email?.toLowerCase() ===
							initialMemberEmail.toLowerCase()
					);
					if (match) setSelectedMemberId(match._id);
				}
			})
			.catch(() => {});
	}, [initialMemberEmail]);

	const handleEnroll = async () => {
		if (!selectedMemberId) return;
		setStatus(null);

		try {
			const fingerprintImage = await capture();
			await biometricApi.enroll(selectedMemberId, fingerprintImage);
			setStatus({ type: "success", message: "Fingerprint enrolled" });
		} catch (error) {
			setStatus({ type: "error", message: error.message });
		}
	};

	return (
		<div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
			<div>
				<h2 className="text-lg font-semibold text-gray-900">
					Enroll Fingerprint
				</h2>
				<p className="text-sm text-gray-600 mt-1">
					Attach a fingerprint to an existing member for biometric
					check-in.
				</p>
			</div>

			<div className="space-y-2">
				<Label>Member</Label>
				<Select
					value={selectedMemberId}
					onValueChange={setSelectedMemberId}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a member" />
					</SelectTrigger>
					<SelectContent>
						{members.map((member) => (
							<SelectItem key={member._id} value={member._id}>
								{member.firstName} {member.lastName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Button
				onClick={handleEnroll}
				disabled={!selectedMemberId || isCapturing}
			>
				{isCapturing ? (
					<Loader2 className="h-4 w-4 mr-2 animate-spin" />
				) : (
					<Fingerprint className="h-4 w-4 mr-2" />
				)}
				Scan &amp; Enroll
			</Button>

			{status && (
				<p
					className={`text-sm ${
						status.type === "error" ? "text-red-600" : "text-green-600"
					}`}
				>
					{status.message}
				</p>
			)}
		</div>
	);
};

export default EnrollmentForm;
