import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import api from "@/services/api";
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

// Form validation schema
const memberFormSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	gender: z.string().optional(),
	dateOfBirth: z.string().optional(),
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email is required").email("Email is invalid"),
	street: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zipCode: z.string().optional(),
	plan: z.string().min(1, "Plan is required"),
	startDate: z.string().min(1, "Start date is required"),
	status: z.string().default("Active"),
	emergencyContactName: z.string().optional(),
	emergencyContactPhone: z.string().optional(),
	emergencyContactRelationship: z.string().optional(),
});

const MemberForm = ({ member, onSubmit, onCancel, isOpen }) => {
	const [plans, setPlans] = useState([]);
	const [loadingPlans, setLoadingPlans] = useState(true);

	const form = useForm({
		resolver: zodResolver(memberFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			gender: "",
			dateOfBirth: "",
			phone: "",
			email: "",
			street: "",
			city: "",
			state: "",
			zipCode: "",
			plan: "",
			startDate: "",
			status: "active",
			emergencyContactName: "",
			emergencyContactPhone: "",
			emergencyContactRelationship: "",
		},
	});

	useEffect(() => {
		const fetchPlans = async () => {
			try {
				setLoadingPlans(true);
				const response = await api.getPlans();
				setPlans(response.data || []);
			} catch (error) {
				console.error("Error fetching plans:", error);
			} finally {
				setLoadingPlans(false);
			}
		};
		fetchPlans();
	}, []);

	useEffect(() => {
		if (member) {
			form.reset({
				firstName: member.firstName || "",
				lastName: member.lastName || "",
				gender: member.gender || "",
				dateOfBirth: member.dateOfBirth || "",
				phone: member.phone || "",
				email: member.email || "",
				street: member.address?.street || "",
				city: member.address?.city || "",
				state: member.address?.state || "",
				zipCode: member.address?.zipCode || "",
				plan: member.plan || "",
				startDate: member.startDate || "",
				status: member.status || "active",
				emergencyContactName: member.emergencyContact?.name || "",
				emergencyContactPhone: member.emergencyContact?.phone || "",
				emergencyContactRelationship:
					member.emergencyContact?.relationship || "",
			});
		} else {
			form.reset({
				firstName: "",
				lastName: "",
				gender: "",
				dateOfBirth: "",
				phone: "",
				email: "",
				street: "",
				city: "",
				state: "",
				zipCode: "",
				plan: "",
				startDate: "",
				status: "active",
				emergencyContactName: "",
				emergencyContactPhone: "",
				emergencyContactRelationship: "",
			});
		}
	}, [member, isOpen, form]);

	const handleFormSubmit = (data) => {
		onSubmit(data);
		form.reset();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
			className="w-full"
		>
			<h2 className="text-xl font-semibold text-gray-900 mb-6">
				{member ? "Edit Member" : "Add New Member"}
			</h2>
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

					{/* Gender and Date of Birth */}
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
											<SelectItem value="male">
												Male
											</SelectItem>
											<SelectItem value="female">
												Female
											</SelectItem>
											<SelectItem value="other">
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
							name="dateOfBirth"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of Birth</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Phone and Email */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="street"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Residence</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter residence"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="plan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Membership Plan *</FormLabel>
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
											{loadingPlans ? (
												<SelectItem
													value="loading"
													disabled
												>
													Loading plans...
												</SelectItem>
											) : (
												plans.map((plan) => (
													<SelectItem
														key={plan._id}
														value={plan._id}
													>
														{plan.name}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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
											<SelectItem value="active">
												Active
											</SelectItem>
											<SelectItem value="inactive">
												Inactive
											</SelectItem>
											<SelectItem value="suspended">
												Suspended
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Emergency Contact */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-gray-700">
							Emergency Contact
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<FormField
								control={form.control}
								name="emergencyContactName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Contact name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="emergencyContactPhone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input
												placeholder="Contact phone"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="emergencyContactRelationship"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Relationship</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g., Spouse, Parent"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

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
							<Button type="submit">
								{member ? "Update Member" : "Add Member"}
							</Button>
						</motion.div>
					</div>
				</form>
			</Form>
		</motion.div>
	);
};

export default MemberForm;
