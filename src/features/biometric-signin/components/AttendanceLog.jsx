import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import biometricApi from "../api";

const AttendanceLog = () => {
	const [checkIns, setCheckIns] = useState([]);

	useEffect(() => {
		biometricApi
			.getCheckIns()
			.then((res) => setCheckIns(res.data))
			.catch(() => {});
	}, []);

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			<div className="p-6 border-b border-gray-200">
				<h2 className="text-lg font-semibold text-gray-900">
					Attendance Log
				</h2>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Member</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Method</TableHead>
						<TableHead>Time</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{checkIns.map((checkIn) => (
						<TableRow key={checkIn._id}>
							<TableCell>
								{checkIn.member?.firstName} {checkIn.member?.lastName}
							</TableCell>
							<TableCell>
								<Badge
									variant={
										checkIn.type === "check-in"
											? "default"
											: "secondary"
									}
								>
									{checkIn.type}
								</Badge>
							</TableCell>
							<TableCell className="capitalize">
								{checkIn.method}
							</TableCell>
							<TableCell>
								{new Date(checkIn.timestamp).toLocaleString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default AttendanceLog;
