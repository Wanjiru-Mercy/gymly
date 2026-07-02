import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ServiceTable from "@/components/services/ServiceTable";
import ServiceForm from "@/components/services/ServiceForm";

const mockServices = [
	{
		id: 1,
		name: "Swedish Massage",
		description: "Relaxing full-body massage",
		category: "Spa",
		duration: "60 mins",
		price: 80,
		status: "active",
	},
	{
		id: 2,
		name: "Lap Swimming",
		description: "Access to lap pool",
		category: "Class",
		duration: "Variable",
		price: 0,
		status: "active",
	},
	{
		id: 3,
		name: "Tennis Court (1 hour)",
		description: "Court booking with equipment",
		category: "Court",
		duration: "60 mins",
		price: 25,
		status: "active",
	},
	{
		id: 4,
		name: "Personal Training (30m)",
		description: "One-on-one coaching",
		category: "Class",
		duration: "30 mins",
		price: 40,
		status: "inactive",
	},
];

const Services = () => {
	const [services, setServices] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("All");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editing, setEditing] = useState(null);

	useEffect(() => {
		// load mock data
		setTimeout(() => setServices(mockServices), 200);
	}, []);

	const handleAdd = () => {
		setEditing(null);
		setIsFormOpen(true);
	};

	const handleEdit = (s) => {
		setEditing(s);
		setIsFormOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Delete service?")) {
			setServices((prev) => prev.filter((x) => (x.id || x._id) !== id));
		}
	};

	const handleFormSubmit = (data) => {
		if (editing) {
			setServices((prev) =>
				prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)),
			);
		} else {
			const newService = { ...data, id: Date.now() };
			setServices((prev) => [newService, ...prev]);
		}
		setIsFormOpen(false);
		setEditing(null);
	};

	const handleCancel = () => {
		setIsFormOpen(false);
		setEditing(null);
	};

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Services
					</h2>
					<p className="text-gray-600 mt-1">
						Manage classes, spa, courts, and other services
					</p>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
					<div className="relative w-full sm:w-1/2">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search services..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 w-full"
						/>
					</div>

					<div className="flex gap-3">
						<Button onClick={handleAdd}>
							<Plus className="h-4 w-4 mr-2" />
							Add Service
						</Button>
					</div>
				</div>

				<ServiceTable
					services={services}
					onEdit={handleEdit}
					onDelete={handleDelete}
					searchTerm={searchTerm}
					filterStatus={filterStatus}
				/>

				{isFormOpen && (
					<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
						<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
							<div className="p-6">
								<ServiceForm
									service={editing}
									onSubmit={handleFormSubmit}
									onCancel={handleCancel}
									isOpen={isFormOpen}
								/>
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</DashboardLayout>
	);
};

export default Services;
