import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Form validation schema
const memberFormSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	gender: z.string().optional(),
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email is required").email("Email is invalid"),
	plan: z.string().min(1, "Plan is required"),
	startDate: z.string().min(1, "Start date is required"),
	endDate: z.string().min(1, "End date is required"),
	trainer: z.string().min(1, "Trainer is required"),
	status: z.string().default("Active"),
});

const MemberForm = ({ member, onSubmit, onCancel, isOpen }) => {
	const form = useForm({
		resolver: zodResolver(memberFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			gender: "",
			phone: "",
			email: "",
			plan: "",
			startDate: "",
			endDate: "",
			trainer: "",
			status: "Active",
		},
	});

	useEffect(() => {
		if (member) {
			form.reset({
				firstName: member.firstName || "",
				lastName: member.lastName || "",
				gender: member.gender || "",
				phone: member.phone || "",
				email: member.email || "",
				plan: member.plan || "",
				startDate: member.startDate || "",
				endDate: member.endDate || "",
				trainer: member.trainer || "",
				status: member.status || "Active",
			});
		} else {
			form.reset({
				firstName: "",
				lastName: "",
				gender: "",
				phone: "",
				email: "",
				plan: "",
				startDate: "",
				endDate: "",
				trainer: "",
				status: "Active",
			});
		}
	}, [member, isOpen, form]);

	const handleFormSubmit = (data) => {
		onSubmit(data);
		form.reset();
	};

	const plans = [
		"Basic Plan",
		"Premium Plan",
		"VIP Plan",
		"Student Plan",
		"Senior Plan",
	];

	const trainers = [
		"John Smith",
		"Sarah Johnson",
		"Mike Davis",
		"Emma Wilson",
		"David Brown",
	];

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
		>
			<Card className="w-full max-w-2xl mx-auto border-gray-200 shadow-lg">
				<CardHeader className="bg-gray-100 border-b border-gray-200">
					<CardTitle className="text-xl font-semibold text-gray-900">
						{member ? "Edit Member" : "Add New Member"}
					</CardTitle>
				</CardHeader>
				<CardContent className="bg-gray-50">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleFormSubmit)}
							className="space-y-6"
						>
							{/* Name Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name *</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter first name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name *</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter last name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Gender and Phone */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Gender</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select gender" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Male">
														Male
													</SelectItem>
													<SelectItem value="Female">
														Female
													</SelectItem>
													<SelectItem value="Other">
														Other
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone *</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter phone number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email *</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter email address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Plan and Trainer */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="plan"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Membership Plan *
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select plan" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{plans.map((plan) => (
														<SelectItem
															key={plan}
															value={plan}
														>
															{plan}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="trainer"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Trainer *</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select trainer" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{trainers.map((trainer) => (
														<SelectItem
															key={trainer}
															value={trainer}
														>
															{trainer}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Dates */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="startDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Start Date *</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="endDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>End Date *</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Status */}
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Active">
													Active
												</SelectItem>
												<SelectItem value="Expiring">
													Expiring
												</SelectItem>
												<SelectItem value="Expired">
													Expired
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Buttons */}
							<div className="flex justify-end space-x-3 pt-4">
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										type="button"
										variant="outline"
										onClick={onCancel}
										className="px-6"
									>
										Cancel
									</Button>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										type="submit"
										className="px-6 bg-[#4B5CFF] hover:bg-[#3a4ad8]"
									>
										{member
											? "Update Member"
											: "Add Member"}
									</Button>
								</motion.div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default MemberForm;
