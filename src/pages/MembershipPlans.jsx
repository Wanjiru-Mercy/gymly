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
	ArrowLeft,
	Banknote,
	Users,
	Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const MembershipPlans = () => {
	const [plans, setPlans] = useState([
		{
			id: 1,
			name: "Daily Pass",
			price: 500,
			duration: "daily",
			maxMembers: 500,
			features: [
				"Gym Access",
				"Locker Room",
				"Basic Equipment",
				"1 Day Access",
			],
			status: "active",
			members: 125,
		},
		{
			id: 2,
			name: "Monthly Membership",
			price: 5000,
			duration: "monthly",
			maxMembers: 300,
			features: [
				"Gym Access",
				"Locker Room",
				"All Equipment",
				"30 Days Access",
				"Guest Pass (2x/month)",
			],
			status: "active",
			members: 180,
		},
		{
			id: 3,
			name: "Quarterly Membership",
			price: 12000,
			duration: "quarterly",
			maxMembers: 200,
			features: [
				"Gym Access",
				"Locker Room",
				"All Equipment",
				"90 Days Access",
				"Guest Pass (5x/quarter)",
				"Free Fitness Assessment",
			],
			status: "active",
			members: 85,
		},
		{
			id: 4,
			name: "Annual Membership",
			price: 40000,
			duration: "annually",
			maxMembers: 150,
			features: [
				"Gym Access",
				"Locker Room",
				"All Equipment",
				"365 Days Access",
				"Unlimited Guest Pass",
				"Free Fitness Assessment",
				"Priority Booking",
			],
			status: "active",
			members: 95,
		},
	]);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingPlan, setEditingPlan] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		duration: "",
		maxMembers: "",
		features: "",
		status: "active",
	});

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newPlan = {
			id: editingPlan ? editingPlan.id : Date.now(),
			...formData,
			price: parseFloat(formData.price),
			maxMembers: parseInt(formData.maxMembers),
			features: formData.features.split(",").map((f) => f.trim()),
			members: editingPlan ? editingPlan.members : 0,
		};

		if (editingPlan) {
			setPlans((prev) =>
				prev.map((p) => (p.id === editingPlan.id ? newPlan : p))
			);
		} else {
			setPlans((prev) => [...prev, newPlan]);
		}

		resetForm();
	};

	const resetForm = () => {
		setFormData({
			name: "",
			price: "",
			duration: "",
			maxMembers: "",
			features: "",
			status: "active",
		});
		setEditingPlan(null);
		setIsDialogOpen(false);
	};

	const handleEdit = (plan) => {
		setEditingPlan(plan);
		setFormData({
			name: plan.name,
			price: plan.price.toString(),
			duration: plan.duration,
			maxMembers: plan.maxMembers.toString(),
			features: plan.features.join(", "),
			status: plan.status,
		});
		setIsDialogOpen(true);
	};

	const handleDelete = (planId) => {
		if (window.confirm("Are you sure you want to delete this plan?")) {
			setPlans((prev) => prev.filter((p) => p.id !== planId));
		}
	};

	const getStatusColor = (status) => {
		return status === "active"
			? "bg-green-100 text-green-800"
			: "bg-red-100 text-red-800";
	};

	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Link to="/setups">
							<Button variant="ghost" size="sm">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Setups
							</Button>
						</Link>
						<div>
							<h2 className="text-2xl font-bold text-gray-900">
								Membership Plans
							</h2>
							<p className="text-gray-600 mt-1">
								Manage membership types, pricing and benefits
							</p>
						</div>
					</div>

					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button onClick={() => resetForm()}>
								<Plus className="h-4 w-4 mr-2" />
								Add New Plan
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle>
									{editingPlan ? "Edit Plan" : "Add New Plan"}
								</DialogTitle>
								<DialogDescription>
									{editingPlan
										? "Update the membership plan details"
										: "Create a new membership plan with pricing and features"}
								</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<Label htmlFor="name">Plan Name</Label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) =>
											handleInputChange(
												"name",
												e.target.value
											)
										}
										placeholder="e.g., Monthly Membership"
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="price">
											Price (KES)
										</Label>
										<Input
											id="price"
											type="number"
											value={formData.price}
											onChange={(e) =>
												handleInputChange(
													"price",
													e.target.value
												)
											}
											placeholder="5000"
											required
										/>
									</div>
									<div>
										<Label htmlFor="duration">
											Duration
										</Label>
										<Select
											value={formData.duration}
											onValueChange={(value) =>
												handleInputChange(
													"duration",
													value
												)
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select duration" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="daily">
													Daily
												</SelectItem>
												<SelectItem value="monthly">
													Monthly
												</SelectItem>
												<SelectItem value="quarterly">
													Quarterly
												</SelectItem>
												<SelectItem value="annually">
													Annually
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div>
									<Label htmlFor="maxMembers">
										Max Members
									</Label>
									<Input
										id="maxMembers"
										type="number"
										value={formData.maxMembers}
										onChange={(e) =>
											handleInputChange(
												"maxMembers",
												e.target.value
											)
										}
										placeholder="100"
										required
									/>
								</div>
								<div>
									<Label htmlFor="features">
										Features (comma-separated)
									</Label>
									<Input
										id="features"
										value={formData.features}
										onChange={(e) =>
											handleInputChange(
												"features",
												e.target.value
											)
										}
										placeholder="Gym Access, Locker Room, All Equipment, 30 Days Access"
										required
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
											<SelectItem value="active">
												Active
											</SelectItem>
											<SelectItem value="inactive">
												Inactive
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex space-x-2 pt-4">
									<Button type="submit" className="flex-1">
										{editingPlan
											? "Update Plan"
											: "Create Plan"}
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

				{/* Plans Table */}
				<Card>
					<CardHeader>
						<CardTitle>Membership Plans</CardTitle>
						<CardDescription>
							Overview of all membership plans and their details
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Plan Name</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Duration</TableHead>
									{/* <TableHead>Members</TableHead> */}
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{plans.map((plan) => (
									<TableRow key={plan.id}>
										<TableCell className="font-medium">
											<div>
												<div className="font-semibold">
													{plan.name}
												</div>
												{/* <div className="text-sm text-gray-500">
													{plan.features
														.slice(0, 2)
														.join(", ")}
													{plan.features.length > 2 &&
														"..."}
												</div> */}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-1">
												<span className="font-semibold">
													KES{" "}
													{plan.price.toLocaleString()}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-1">
												<span>{plan.duration}</span>
											</div>
										</TableCell>
										{/* <TableCell>
											<div className="flex items-center space-x-2">
												<Users className="h-4 w-4 text-purple-600" />
												<span>
													{plan.members} /{" "}
													{plan.maxMembers}
												</span>
												<div className="w-16 bg-gray-200 rounded-full h-1.5">
													<div
														className="bg-purple-600 h-1.5 rounded-full"
														style={{
															width: `${
																(plan.members /
																	plan.maxMembers) *
																100
															}%`,
														}}
													/>
												</div>
											</div>
										</TableCell> */}
										<TableCell>
											<Badge
												className={getStatusColor(
													plan.status
												)}
											>
												{plan.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														handleEdit(plan)
													}
													className="h-8 w-8 p-0"
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														handleDelete(plan.id)
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

						{plans.length === 0 && (
							<div className="text-center py-8 text-gray-500">
								No membership plans found. Create your first
								plan to get started.
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default MembershipPlans;
