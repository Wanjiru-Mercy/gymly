import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ServiceTable = ({
	services,
	onEdit,
	onDelete,
	searchTerm,
	filterStatus,
}) => {
	const filtered = services.filter((s) => {
		const matchesSearch =
			s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(s.category || "").toLowerCase().includes(searchTerm.toLowerCase());

		const matchesFilter =
			filterStatus === "All" || s.status === filterStatus;

		return matchesSearch && matchesFilter;
	});

	const getBadge = (status) => {
		switch (status) {
			case "active":
				return (
					<Badge className="bg-green-100 text-green-700">
						Active
					</Badge>
				);
			case "inactive":
				return (
					<Badge className="bg-gray-100 text-gray-700">
						Inactive
					</Badge>
				);
			default:
				return (
					<Badge className="bg-gray-100 text-gray-700">
						{status}
					</Badge>
				);
		}
	};

	const formatCurrency = (value) => {
		if (value === null || value === undefined) return "KES 0";
		return `KES ${new Intl.NumberFormat().format(value)}`;
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			<div className="hidden md:block">
				<table className="w-full">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Service
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Category
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Duration
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Price
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
						{filtered.map((s, i) => (
							<motion.tr
								key={s.id || s._id || i}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: i * 0.03 }}
								className="hover:bg-gray-50"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{s.name}
									</div>
									{s.description && (
										<div className="text-sm text-gray-500">
											{s.description}
										</div>
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{s.category}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{s.duration}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{formatCurrency(s.price)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{getBadge(s.status)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex space-x-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onEdit(s)}
											className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600"
										>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												onDelete(s.id || s._id)
											}
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

			<div className="md:hidden">
				<div className="divide-y divide-gray-200">
					{filtered.map((s, i) => (
						<motion.div
							key={s.id || s._id || i}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, delay: i * 0.03 }}
							className="p-4 hover:bg-gray-50"
						>
							<div className="flex justify-between items-start mb-3">
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										{s.name}
									</h3>
									<p className="text-sm text-gray-500">
										{s.category}
									</p>
								</div>
								{getBadge(s.status)}
							</div>

							<div className="grid grid-cols-2 gap-4 text-sm mb-3">
								<div>
									<span className="text-gray-500">
										Duration:
									</span>{" "}
									<span className="ml-1 text-gray-900">
										{s.duration}
									</span>
								</div>
								<div>
									<span className="text-gray-500">
										Price:
									</span>{" "}
									<span className="ml-1 text-gray-900">{formatCurrency(s.price)}</span>
								</div>
							</div>

							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onEdit(s)}
									className="flex-1 h-8 hover:bg-amber-50 hover:text-amber-600"
								>
									<Edit className="h-4 w-4 mr-1" />
									Edit
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onDelete(s.id || s._id)}
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

			{filtered.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500">No services found.</p>
				</div>
			)}
		</div>
	);
};

export default ServiceTable;
