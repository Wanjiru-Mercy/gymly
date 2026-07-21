import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Mail, Phone, Calendar, User, Dumbbell, Fingerprint } from "lucide-react";

const MemberDetails = ({ member, onClose, onEdit, onRegisterBiometrics }) => {
	if (!member) return null;

	const getStatusBadge = (status) => {
		switch (status) {
			case "Active":
				return (
					<Badge className="bg-green-100 text-green-700 hover:bg-green-100">
						Active
					</Badge>
				);
			case "Expiring":
				return (
					<Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
						Expiring
					</Badge>
				);
			case "Expired":
				return (
					<Badge className="bg-red-100 text-red-700 hover:bg-red-100">
						Expired
					</Badge>
				);
			default:
				return (
					<Badge
						variant="secondary"
						className="bg-gray-100 text-gray-700"
					>
						{status}
					</Badge>
				);
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getDaysUntilExpiry = () => {
		const endDate = new Date(member.endDate);
		const today = new Date();
		const diffTime = endDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const daysUntilExpiry = getDaysUntilExpiry();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ duration: 0.2 }}
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-2xl"
			>
				<Card className="shadow-xl">
					<CardHeader className="pb-4">
						<div className="flex justify-between items-start">
							<div className="flex items-center space-x-4">
								<div className="w-16 h-16 bg-gradient-to-br from-[#4B5CFF] to-[#9333EA] rounded-full flex items-center justify-center shadow-lg">
									<User className="h-8 w-8 text-white" />
								</div>
								<div>
									<CardTitle className="text-2xl font-bold text-gray-900">
										{member.firstName} {member.lastName}
									</CardTitle>
									<div className="flex items-center space-x-2 mt-1">
										{getStatusBadge(member.status)}
										{member.status === "Active" &&
											daysUntilExpiry <= 30 && (
												<Badge className="bg-amber-100 text-amber-700">
													{daysUntilExpiry} days left
												</Badge>
											)}
									</div>
								</div>
							</div>
							<div className="flex space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={onEdit}
									className="hover:bg-[#4B5CFF] hover:text-white"
								>
									Edit Member
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={onRegisterBiometrics}
									className="hover:bg-purple-600 hover:text-white"
								>
									<Fingerprint className="h-4 w-4 mr-1" />
									Register Biometrics
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={onClose}
									className="h-8 w-8 p-0"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Contact Information */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center">
									<Mail className="h-5 w-5 mr-2 text-[#4B5CFF]" />
									Contact Information
								</h3>
								<div className="space-y-3">
									<div className="flex items-center space-x-3">
										<Mail className="h-4 w-4 text-gray-400" />
										<span className="text-gray-600">
											{member.email}
										</span>
									</div>
									<div className="flex items-center space-x-3">
										<Phone className="h-4 w-4 text-gray-400" />
										<span className="text-gray-600">
											{member.phone}
										</span>
									</div>
									<div className="flex items-center space-x-3">
										<User className="h-4 w-4 text-gray-400" />
										<span className="text-gray-600">
											{member.gender}
										</span>
									</div>
								</div>
							</div>

							{/* Membership Details */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center">
									<Dumbbell className="h-5 w-5 mr-2 text-[#4B5CFF]" />
									Membership Details
								</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-500">
											Plan:
										</span>
										<span className="font-medium text-gray-900">
											{member.plan}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-500">
											Trainer:
										</span>
										<span className="font-medium text-gray-900">
											{member.trainer}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-500">
											Status:
										</span>
										{getStatusBadge(member.status)}
									</div>
								</div>
							</div>
						</div>

						{/* Membership Dates */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-gray-900 flex items-center">
								<Calendar className="h-5 w-5 mr-2 text-[#4B5CFF]" />
								Membership Period
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="bg-gray-50 rounded-lg p-4">
									<p className="text-sm text-gray-500 mb-1">
										Start Date
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{formatDate(member.startDate)}
									</p>
								</div>
								<div className="bg-gray-50 rounded-lg p-4">
									<p className="text-sm text-gray-500 mb-1">
										End Date
									</p>
									<p className="text-lg font-semibold text-gray-900">
										{formatDate(member.endDate)}
									</p>
									{daysUntilExpiry > 0 ? (
										<p className="text-sm text-gray-600 mt-1">
											{daysUntilExpiry} days remaining
										</p>
									) : (
										<p className="text-sm text-red-600 mt-1">
											Expired {Math.abs(daysUntilExpiry)}{" "}
											days ago
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
							<Button variant="outline" onClick={onClose}>
								Close
							</Button>
							<Button
								onClick={onEdit}
								className="bg-[#4B5CFF] hover:bg-[#3a4ad8] text-white"
							>
								Edit Member
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
};

export default MemberDetails;
