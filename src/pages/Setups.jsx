import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	CreditCard,
	Users,
	Settings,
	Clock,
	MapPin,
	DollarSign,
	ArrowRight,
	Sparkles,
} from "lucide-react";

const Setups = () => {
	const location = useLocation();

	const setupMenuItems = [
		{
			title: "Membership Plans",
			description: "Configure membership types, pricing and benefits",
			icon: CreditCard,
			path: "/setups/membership-plans",
			gradient: "from-[#4B5CFF] to-[#9333EA]",
			bgPattern: "bg-gradient-to-br from-blue-50 to-purple-50",
			accentColor: "text-[#4B5CFF]",
			stats: "12 Plans",
		},
		{
			title: "User Roles",
			description: "Manage user permissions and access levels",
			icon: Users,
			path: "/setups/user-roles",
			gradient: "from-[#10B981] to-[#059669]",
			bgPattern: "bg-gradient-to-br from-emerald-50 to-green-50",
			accentColor: "text-emerald-600",
			stats: "5 Roles",
		},
		{
			title: "System Settings",
			description: "General system configuration and preferences",
			icon: Settings,
			path: "/setups/system-settings",
			gradient: "from-[#8B5CF6] to-[#7C3AED]",
			bgPattern: "bg-gradient-to-br from-violet-50 to-purple-50",
			accentColor: "text-violet-600",
			stats: "8 Settings",
		},
		{
			title: "Operating Hours",
			description: "Set gym operating hours and schedules",
			icon: Clock,
			path: "/setups/operating-hours",
			gradient: "from-[#F59E0B] to-[#D97706]",
			bgPattern: "bg-gradient-to-br from-amber-50 to-orange-50",
			accentColor: "text-amber-600",
			stats: "7 Days",
		},
		{
			title: "Locations",
			description: "Manage gym locations and facilities",
			icon: MapPin,
			path: "/setups/locations",
			gradient: "from-[#EF4444] to-[#DC2626]",
			bgPattern: "bg-gradient-to-br from-red-50 to-rose-50",
			accentColor: "text-red-600",
			stats: "3 Locations",
		},
		{
			title: "Payment Methods",
			description: "Configure payment options and gateways",
			icon: DollarSign,
			path: "/setups/payment-methods",
			gradient: "from-[#6366F1] to-[#4F46E5]",
			bgPattern: "bg-gradient-to-br from-indigo-50 to-blue-50",
			accentColor: "text-indigo-600",
			stats: "4 Methods",
		},
	];

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Setups & Settings
					</h2>
					<p className="text-gray-600 mt-1">
						Configure system settings and manage setup options
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{setupMenuItems.map((item, index) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;

						return (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: index * 0.1,
								}}
								whileHover={{ y: -8, scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Link to={item.path}>
									<div
										className={`
										relative overflow-hidden rounded-2xl border-0 shadow-lg backdrop-blur-sm
										${item.bgPattern} ${isActive ? "ring-4 ring-[#4B5CFF]/20 shadow-2xl" : ""}
										hover:shadow-2xl transition-all duration-500 group cursor-pointer
									`}
									>
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm" />

										{/* Decorative elements */}
										<div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16">
											<div
												className={`w-full h-full rounded-full bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
											/>
										</div>

										{/* Sparkles decoration */}
										<div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
											<Sparkles className="h-5 w-5 text-gray-400" />
										</div>

										<div className="relative p-6 space-y-4">
											{/* Icon and Stats Row */}
											<div className="flex items-start justify-between">
												<motion.div
													className={`
														w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} 
														flex items-center justify-center shadow-xl group-hover:shadow-2xl
														transform transition-all duration-500 group-hover:rotate-12
													`}
													whileHover={{
														rotate: 12,
														scale: 1.1,
													}}
												>
													<Icon className="h-8 w-8 text-white" />
												</motion.div>

												<div className="text-right">
													<div
														className={`text-sm font-semibold ${item.accentColor}`}
													>
														{item.stats}
													</div>
													<div className="text-xs text-gray-500 mt-1">
														Active
													</div>
												</div>
											</div>

											{/* Content */}
											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
														{item.title}
													</h3>
													<motion.div
														initial={{ x: 0 }}
														whileHover={{ x: 4 }}
														className="opacity-0 group-hover:opacity-100 transition-all duration-300"
													>
														<ArrowRight
															className={`h-5 w-5 ${item.accentColor}`}
														/>
													</motion.div>
												</div>

												<p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
													{item.description}
												</p>
											</div>

											{/* Action indicator */}
											<div className="flex items-center justify-between pt-2">
												<div
													className={`
													h-1 w-12 rounded-full bg-gradient-to-r ${item.gradient} 
													transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
												`}
												/>

												<div className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
													Configure →
												</div>
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						);
					})}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Setups;
