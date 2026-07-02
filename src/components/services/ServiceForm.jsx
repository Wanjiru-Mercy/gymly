import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const serviceSchema = z.object({
	name: z.string().min(1, "Service name is required"),
	description: z.string().optional(),
	category: z.string().min(1, "Category is required"),
	duration: z.string().optional(),
	price: z.number().min(0).or(z.string()).optional(),
	status: z.string().default("active"),
});

const ServiceForm = ({ service, onSubmit, onCancel, isOpen }) => {
	const form = useForm({
		resolver: zodResolver(serviceSchema),
		defaultValues: {
			name: "",
			description: "",
			category: "Class",
			duration: "30 mins",
			price: "0",
			status: "active",
		},
	});

	useEffect(() => {
		if (service) {
			form.reset({
				name: service.name || "",
				description: service.description || "",
				category: service.category || "Class",
				duration: service.duration || "",
				price: service.price || "0",
				status: service.status || "active",
			});
		} else {
			form.reset();
		}
	}, [service, isOpen]);

	const handleSubmit = (data) => {
		// ensure price is number when possible
		const payload = { ...data, price: Number(data.price) || 0 };
		onSubmit(payload);
		form.reset();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ duration: 0.15 }}
			className="w-full"
		>
			<h2 className="text-xl font-semibold text-gray-900 mb-6">
				{service ? "Edit Service" : "Add New Service"}
			</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Service Name *</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g., Swedish Massage"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Short description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category *</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Class">
												Class
											</SelectItem>
											<SelectItem value="Spa">
												Spa
											</SelectItem>
											<SelectItem value="Court">
												Court
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
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., 60 mins"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input placeholder="0" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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
								{service ? "Update Service" : "Add Service"}
							</Button>
						</motion.div>
					</div>
				</form>
			</Form>
		</motion.div>
	);
};

export default ServiceForm;
