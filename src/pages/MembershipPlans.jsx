import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import api from "@/services/api";
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
import { useToast } from "@/components/Toast";
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
	const { showToast } = useToast();
	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(true);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingPlan, setEditingPlan] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		duration: "",
		status: "active",
	});

	// Fetch plans on mount
	useEffect(() => {
		fetchPlans();
	}, []);

	const fetchPlans = async () => {
		try {
			setLoading(true);
			const response = await api.getPlans();
			setPlans(response.data || []);
		} catch (error) {
			console.error("Error fetching plans:", error);
			showToast("Failed to load plans", "error");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const planData = {
				name: formData.name,

				price: parseFloat(formData.price),
				duration: formData.duration,
				status: formData.status,
			};

			if (editingPlan) {
				await api.updatePlan(editingPlan._id, planData);
				showToast("Plan updated successfully", "success");
			} else {
				await api.createPlan(planData);
				showToast("Plan created successfully", "success");
			}

			await fetchPlans();
			resetForm();
		} catch (error) {
			console.error("Error saving plan:", error);
			showToast(
				`Failed to ${editingPlan ? "update" : "create"} plan`,
				"error"
			);
		}
	};

	const resetForm = () => {
		setFormData({
			name: "",
			price: "",
			duration: "",
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
			status: plan.status,
		});
		setIsDialogOpen(true);
	};

	const handleDelete = async (planId) => {
		if (window.confirm("Are you sure you want to delete this plan?")) {
			try {
				await api.deletePlan(planId);
				await fetchPlans();
				showToast("Plan deleted successfully", "success");
			} catch (error) {
				console.error("Error deleting plan:", error);
				showToast("Failed to delete plan", "error");
			}
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

									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{loading ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className="text-center py-8"
										>
											Loading plans...
										</TableCell>
									</TableRow>
								) : (
									plans.map((plan) => (
										<TableRow key={plan._id}>
											<TableCell className="font-medium">
												<div>
													<div className="font-semibold">
														{plan.name}
													</div>
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
															handleDelete(
																plan._id
															)
														}
														className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>

						{plans.length === 0 && !loading && (
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
