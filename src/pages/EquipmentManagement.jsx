import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Plus,
	Edit,
	Trash2,
	Wrench,
	AlertCircle,
	CheckCircle,
} from "lucide-react";

const EquipmentManagement = () => {
	const [equipment, setEquipment] = useState([
		{
			id: "EQ-001",
			name: "Treadmill",
			category: "Cardio",
			quantity: 8,
			condition: "Good",
			lastMaintenance: "2025-09-10",
			status: "Active",
			notes: "Regular maintenance scheduled",
		},
		{
			id: "EQ-002",
			name: "Bench Press",
			category: "Strength",
			quantity: 5,
			condition: "Good",
			lastMaintenance: "2025-08-15",
			status: "Active",
			notes: "",
		},
		{
			id: "EQ-003",
			name: "Rowing Machine",
			category: "Cardio",
			quantity: 4,
			condition: "Needs Maintenance",
			lastMaintenance: "2025-07-20",
			status: "In Repair",
			notes: "Belt replacement needed",
		},
		{
			id: "EQ-004",
			name: "Yoga Mats",
			category: "Flexibility",
			quantity: 30,
			condition: "New",
			lastMaintenance: "2025-10-01",
			status: "Active",
			notes: "Recently purchased",
		},
		{
			id: "EQ-005",
			name: "Dumbbells (Set)",
			category: "Strength",
			quantity: 15,
			condition: "Good",
			lastMaintenance: "2025-09-01",
			status: "Active",
			notes: "5kg to 50kg sets",
		},
	]);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingEquipment, setEditingEquipment] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		quantity: "",
		condition: "",
		lastMaintenance: "",
		status: "Active",
		notes: "",
	});

	const generateEquipmentId = () => {
		const maxId = equipment.reduce((max, item) => {
			const num = parseInt(item.id.split("-")[1]);
			return num > max ? num : max;
		}, 0);
		return `EQ-${String(maxId + 1).padStart(3, "0")}`;
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate quantity is positive
		if (parseInt(formData.quantity) <= 0) {
			alert("Quantity must be a positive number");
			return;
		}

		const newEquipment = {
			id: editingEquipment ? editingEquipment.id : generateEquipmentId(),
			name: formData.name,
			category: formData.category,
			quantity: parseInt(formData.quantity),
			condition: formData.condition,
			lastMaintenance:
				formData.lastMaintenance ||
				new Date().toISOString().split("T")[0],
			status: formData.status,
			notes: formData.notes,
		};

		if (editingEquipment) {
			setEquipment((prev) =>
				prev.map((item) =>
					item.id === editingEquipment.id ? newEquipment : item
				)
			);
			alert("Equipment updated successfully!");
		} else {
			setEquipment((prev) => [...prev, newEquipment]);
			alert("Equipment added successfully!");
		}

		resetForm();
	};

	const resetForm = () => {
		setFormData({
			name: "",
			category: "",
			quantity: "",
			condition: "",
			lastMaintenance: "",
			status: "Active",
			notes: "",
		});
		setEditingEquipment(null);
		setIsDialogOpen(false);
	};

	const handleEdit = (item) => {
		setEditingEquipment(item);
		setFormData({
			name: item.name,
			category: item.category,
			quantity: item.quantity.toString(),
			condition: item.condition,
			lastMaintenance: item.lastMaintenance,
			status: item.status,
			notes: item.notes,
		});
		setIsDialogOpen(true);
	};

	const handleDelete = (equipmentId) => {
		if (window.confirm("Are you sure you want to delete this equipment?")) {
			setEquipment((prev) =>
				prev.filter((item) => item.id !== equipmentId)
			);
			alert("Equipment deleted successfully!");
		}
	};

	const getConditionColor = (condition) => {
		switch (condition) {
			case "New":
				return "bg-green-100 text-green-800";
			case "Good":
				return "bg-blue-100 text-blue-800";
			case "Needs Maintenance":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Active":
				return "bg-green-100 text-green-800";
			case "In Repair":
				return "bg-orange-100 text-orange-800";
			case "Retired":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "Active":
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case "In Repair":
				return <Wrench className="h-4 w-4 text-orange-600" />;
			case "Retired":
				return <AlertCircle className="h-4 w-4 text-red-600" />;
			default:
				return null;
		}
	};

	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">
							Equipment Management
						</h2>
						<p className="text-gray-600 mt-1">
							Track and manage gym equipment inventory and
							maintenance
						</p>
					</div>

					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button onClick={() => resetForm()}>
								<Plus className="h-4 w-4 mr-2" />
								Add New Equipment
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle>
									{editingEquipment
										? "Edit Equipment"
										: "Add New Equipment"}
								</DialogTitle>
								<DialogDescription>
									{editingEquipment
										? "Update equipment details"
										: "Add new equipment to your gym inventory"}
								</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<Label htmlFor="name">
										Equipment Name{" "}
										<span className="text-red-500">*</span>
									</Label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) =>
											handleInputChange(
												"name",
												e.target.value
											)
										}
										placeholder="e.g., Treadmill"
										required
									/>
								</div>

								<div>
									<Label htmlFor="category">
										Category{" "}
										<span className="text-red-500">*</span>
									</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											handleInputChange("category", value)
										}
										required
									>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Cardio">
												Cardio
											</SelectItem>
											<SelectItem value="Strength">
												Strength
											</SelectItem>
											<SelectItem value="Flexibility">
												Flexibility
											</SelectItem>
											<SelectItem value="Functional">
												Functional
											</SelectItem>
											<SelectItem value="Accessories">
												Accessories
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor="quantity">
										Quantity{" "}
										<span className="text-red-500">*</span>
									</Label>
									<Input
										id="quantity"
										type="number"
										min="1"
										value={formData.quantity}
										onChange={(e) =>
											handleInputChange(
												"quantity",
												e.target.value
											)
										}
										placeholder="8"
										required
									/>
								</div>

								<div>
									<Label htmlFor="condition">
										Condition{" "}
										<span className="text-red-500">*</span>
									</Label>
									<Select
										value={formData.condition}
										onValueChange={(value) =>
											handleInputChange(
												"condition",
												value
											)
										}
										required
									>
										<SelectTrigger>
											<SelectValue placeholder="Select condition" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="New">
												New
											</SelectItem>
											<SelectItem value="Good">
												Good
											</SelectItem>
											<SelectItem value="Needs Maintenance">
												Needs Maintenance
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor="lastMaintenance">
										Last Maintenance Date
									</Label>
									<Input
										id="lastMaintenance"
										type="date"
										value={formData.lastMaintenance}
										onChange={(e) =>
											handleInputChange(
												"lastMaintenance",
												e.target.value
											)
										}
									/>
								</div>

								<div>
									<Label htmlFor="status">Status</Label>
									<Select
										value={formData.status}
										onValueChange={(value) =>
											handleInputChange("status", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Active">
												Active
											</SelectItem>
											<SelectItem value="In Repair">
												In Repair
											</SelectItem>
											<SelectItem value="Retired">
												Retired
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor="notes">Notes</Label>
									<Input
										id="notes"
										value={formData.notes}
										onChange={(e) =>
											handleInputChange(
												"notes",
												e.target.value
											)
										}
										placeholder="Additional notes (optional)"
									/>
								</div>

								<div className="flex space-x-2 pt-4">
									<Button type="submit" className="flex-1">
										{editingEquipment
											? "Update Equipment"
											: "Add Equipment"}
									</Button>
									<Button
										type="button"
										variant="outline"
										onClick={resetForm}
									>
										Cancel
									</Button>
								</div>
							</form>
						</DialogContent>
					</Dialog>
				</div>

				{/* Equipment Table */}
				<Card>
					<CardHeader>
						<CardTitle>Equipment Inventory</CardTitle>
						<CardDescription>
							View all gym equipment and their status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Equipment ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Condition</TableHead>
									<TableHead>Last Maintenance</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{equipment.map((item) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">
											{item.id}
										</TableCell>
										<TableCell>
											<div>
												<div className="font-semibold">
													{item.name}
												</div>
												{item.notes && (
													<div className="text-sm text-gray-500">
														{item.notes}
													</div>
												)}
											</div>
										</TableCell>
										<TableCell>
											<Badge variant="outline">
												{item.category}
											</Badge>
										</TableCell>
										<TableCell>
											<span className="font-semibold">
												{item.quantity}
											</span>
										</TableCell>
										<TableCell>
											<Badge
												className={getConditionColor(
													item.condition
												)}
											>
												{item.condition}
											</Badge>
										</TableCell>
										<TableCell>
											{new Date(
												item.lastMaintenance
											).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2">
												{getStatusIcon(item.status)}
												<Badge
													className={getStatusColor(
														item.status
													)}
												>
													{item.status}
												</Badge>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														handleEdit(item)
													}
													className="h-8 w-8 p-0"
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														handleDelete(item.id)
													}
													className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{equipment.length === 0 && (
							<div className="text-center py-8 text-gray-500">
								No equipment found. Add your first equipment to
								get started.
							</div>
						)}
					</CardContent>
				</Card>

				{/* Summary Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card className="p-4 text-center">
						<div className="text-2xl font-bold text-blue-600">
							{equipment.length}
						</div>
						<div className="text-sm text-gray-600">
							Total Equipment Types
						</div>
					</Card>
					<Card className="p-4 text-center">
						<div className="text-2xl font-bold text-green-600">
							{equipment.reduce(
								(sum, item) => sum + item.quantity,
								0
							)}
						</div>
						<div className="text-sm text-gray-600">Total Units</div>
					</Card>
					<Card className="p-4 text-center">
						<div className="text-2xl font-bold text-orange-600">
							{
								equipment.filter(
									(item) => item.status === "In Repair"
								).length
							}
						</div>
						<div className="text-sm text-gray-600">In Repair</div>
					</Card>
					<Card className="p-4 text-center">
						<div className="text-2xl font-bold text-yellow-600">
							{
								equipment.filter(
									(item) =>
										item.condition === "Needs Maintenance"
								).length
							}
						</div>
						<div className="text-sm text-gray-600">
							Needs Maintenance
						</div>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default EquipmentManagement;
