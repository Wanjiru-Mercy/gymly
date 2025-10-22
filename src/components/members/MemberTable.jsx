import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MemberTable = ({
	members,
	onView,
	onEdit,
	onDelete,
	searchTerm,
	filterStatus,
}) => {
	// Filter members based on search term and status
	const filteredMembers = members.filter((member) => {
		const matchesSearch =
			member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.email.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesFilter =
			filterStatus === "All" || member.status === filterStatus;

		return matchesSearch && matchesFilter;
	});

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
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			{/* Desktop Table */}
			<div className="hidden md:block">
				<table className="w-full">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Full Name
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Plan
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Trainer
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Start Date
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								End Date
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredMembers.map((member, index) => (
							<motion.tr
								key={member.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.3,
									delay: index * 0.05,
								}}
								className="hover:bg-gray-50"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{member.firstName} {member.lastName}
									</div>
									<div className="text-sm text-gray-500">
										{member.email}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{member.plan}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{member.trainer}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{formatDate(member.startDate)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{formatDate(member.endDate)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{getStatusBadge(member.status)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex space-x-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onView(member)}
											className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
										>
											<Eye className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onEdit(member)}
											className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600"
										>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onDelete(member.id)}
											className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Cards */}
			<div className="md:hidden">
				<div className="divide-y divide-gray-200">
					{filteredMembers.map((member, index) => (
						<motion.div
							key={member.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.05 }}
							className="p-4 hover:bg-gray-50"
						>
							<div className="flex justify-between items-start mb-3">
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										{member.firstName} {member.lastName}
									</h3>
									<p className="text-sm text-gray-500">
										{member.email}
									</p>
								</div>
								{getStatusBadge(member.status)}
							</div>

							<div className="grid grid-cols-2 gap-4 text-sm mb-3">
								<div>
									<span className="text-gray-500">Plan:</span>
									<span className="ml-1 text-gray-900">
										{member.plan}
									</span>
								</div>
								<div>
									<span className="text-gray-500">
										Trainer:
									</span>
									<span className="ml-1 text-gray-900">
										{member.trainer}
									</span>
								</div>
								<div>
									<span className="text-gray-500">
										Start:
									</span>
									<span className="ml-1 text-gray-900">
										{formatDate(member.startDate)}
									</span>
								</div>
								<div>
									<span className="text-gray-500">End:</span>
									<span className="ml-1 text-gray-900">
										{formatDate(member.endDate)}
									</span>
								</div>
							</div>

							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onView(member)}
									className="flex-1 h-8 hover:bg-blue-50 hover:text-blue-600"
								>
									<Eye className="h-4 w-4 mr-1" />
									View
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onEdit(member)}
									className="flex-1 h-8 hover:bg-amber-50 hover:text-amber-600"
								>
									<Edit className="h-4 w-4 mr-1" />
									Edit
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onDelete(member.id)}
									className="flex-1 h-8 hover:bg-red-50 hover:text-red-600"
								>
									<Trash2 className="h-4 w-4 mr-1" />
									Delete
								</Button>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{filteredMembers.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500">
						No members found matching your criteria.
					</p>
				</div>
			)}
		</div>
	);
};

export default MemberTable;
