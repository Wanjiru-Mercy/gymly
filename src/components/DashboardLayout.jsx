import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
	LayoutDashboard,
	Users,
	Dumbbell,
	Sparkles,
	UserCog,
	CreditCard,
	Calculator,
	Menu,
	ChevronLeft,
	ChevronRight,
	Bell,
	Search,
	Settings,
	LogOut,
	Fingerprint,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = ({
	children,
	username = "Admin User",
	userAvatar = null,
}) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();
	const currentYear = new Date().getFullYear();

	const modules = [
		{ name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
		{ name: "Member Management", icon: Users, path: "/members" },
		{ name: "Equipment Management", icon: Dumbbell, path: "/equipment" },
		{ name: "Services", icon: Sparkles, path: "/services" },
		{ name: "Staff Management", icon: UserCog, path: "/staff" },
		{ name: "Biometric Sign-In", icon: Fingerprint, path: "/biometric-signin" },
		{ name: "Billing", icon: CreditCard, path: "/billing" },
		{ name: "Accounting", icon: Calculator, path: "/accounting" },
		{ name: "Setups", icon: Settings, path: "/setups" },
	];

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	// Get user initials for avatar fallback
	const getUserInitials = (name) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	// Get active module name from current path
	const getActiveModule = () => {
		const currentModule = modules.find((m) =>
			location.pathname.startsWith(m.path)
		);
		return currentModule ? currentModule.name : "Dashboard";
	};

	return (
		<div className="flex h-screen bg-gray-50 overflow-hidden">
			{/* Desktop Sidebar */}
			<motion.aside
				initial={{ width: sidebarOpen ? 280 : 80 }}
				animate={{ width: sidebarOpen ? 280 : 80 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="hidden lg:flex bg-[#1C1E26] border-r border-gray-800 flex-col shadow-xl z-30"
			>
				{/* Sidebar Header */}
				<div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
					{sidebarOpen && (
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-[#4B5CFF] to-[#9333EA] rounded-xl flex items-center justify-center shadow-lg">
								<Dumbbell className="h-6 w-6 text-white" />
							</div>
							<div>
								<span className="text-xl font-bold text-white">
									Gymly
								</span>
								<p className="text-xs text-gray-400">
									Health Club System
								</p>
							</div>
						</div>
					)}

					<Button
						variant="ghost"
						size="icon"
						onClick={toggleSidebar}
						className="h-9 w-9 hover:bg-gray-800 flex-shrink-0 text-gray-400 hover:text-white"
					>
						{sidebarOpen ? (
							<ChevronLeft className="h-5 w-5" />
						) : (
							<ChevronRight className="h-5 w-5" />
						)}
					</Button>
				</div>

				{/* Sidebar Navigation */}
				<ScrollArea className="flex-1 py-4">
					<nav className="space-y-1 px-3">
						{modules.map((module) => {
							const Icon = module.icon;
							const isActive =
								location.pathname === module.path ||
								location.pathname.startsWith(module.path + "/");

							return (
								<Link key={module.name} to={module.path}>
									<motion.div
										whileHover={!isActive ? { x: 4 } : {}}
										whileTap={{ scale: 0.98 }}
										className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-300 cursor-pointer
                      ${
							isActive
								? "bg-gradient-to-r from-[#4B5CFF] to-[#9333EA] text-white font-medium shadow-lg"
								: "text-gray-400 hover:bg-gray-800 hover:text-white"
						}
                    `}
									>
										<Icon className="h-5 w-5 flex-shrink-0" />
										{sidebarOpen && (
											<span className="text-sm whitespace-nowrap">
												{module.name}
											</span>
										)}
									</motion.div>
								</Link>
							);
						})}
					</nav>
				</ScrollArea>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-gray-800">
					{sidebarOpen ? (
						<div className="space-y-2">
							<Button
								variant="ghost"
								className="w-full justify-start text-sm text-gray-400 hover:text-white hover:bg-gray-800"
							>
								<Settings className="h-4 w-4 mr-2" />
								Settings
							</Button>
							<div className="text-xs text-gray-500 text-center pt-2">
								&copy; {currentYear} Gymly
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center space-y-3">
							<Button
								variant="ghost"
								size="icon"
								className="h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
							>
								<Settings className="h-5 w-5" />
							</Button>
							<div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
						</div>
					)}
				</div>
			</motion.aside>

			{/* Mobile Sidebar */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleMobileMenu}
							className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
						/>
						<motion.aside
							initial={{ x: -280 }}
							animate={{ x: 0 }}
							exit={{ x: -280 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#1C1E26] border-r border-gray-800 flex flex-col shadow-xl z-50"
						>
							{/* Mobile Sidebar Header */}
							<div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-gradient-to-br from-[#4B5CFF] to-[#9333EA] rounded-xl flex items-center justify-center shadow-lg">
										<Dumbbell className="h-6 w-6 text-white" />
									</div>
									<div>
										<span className="text-xl font-bold text-white">
											Gymly
										</span>
										<p className="text-xs text-gray-400">
											Health Club System
										</p>
									</div>
								</div>
							</div>

							{/* Mobile Navigation */}
							<ScrollArea className="flex-1 py-4">
								<nav className="space-y-1 px-3">
									{modules.map((module) => {
										const Icon = module.icon;
										const isActive =
											location.pathname === module.path ||
											location.pathname.startsWith(
												module.path + "/"
											);

										return (
											<Link
												key={module.name}
												to={module.path}
												onClick={toggleMobileMenu}
											>
												<motion.div
													whileTap={{ scale: 0.98 }}
													className={`
                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                            transition-all duration-300 cursor-pointer
                            ${
								isActive
									? "bg-gradient-to-r from-[#4B5CFF] to-[#9333EA] text-white font-medium shadow-lg"
									: "text-gray-400 hover:bg-gray-800 hover:text-white"
							}
                          `}
												>
													<Icon className="h-5 w-5 flex-shrink-0" />
													<span className="text-sm">
														{module.name}
													</span>
												</motion.div>
											</Link>
										);
									})}
								</nav>
							</ScrollArea>

							{/* Mobile Footer */}
							<div className="p-4 border-t border-gray-800">
								<Button
									variant="ghost"
									className="w-full justify-start text-sm text-gray-400 hover:text-white hover:bg-gray-800"
								>
									<Settings className="h-4 w-4 mr-2" />
									Settings
								</Button>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Navbar */}
				<header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm z-20">
					{/* Left Section - Menu Toggle and Title */}
					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMobileMenu}
							className="lg:hidden h-9 w-9"
						>
							<Menu className="h-5 w-5 text-gray-600" />
						</Button>

						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="flex items-center space-x-2"
						>
							<h1 className="text-lg lg:text-xl font-semibold text-gray-800">
								{getActiveModule()}
							</h1>
						</motion.div>
					</div>

					{/* Right Section - Search, Notifications, User */}
					<div className="flex items-center space-x-2 lg:space-x-4">
						{/* Search Button */}
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 hidden md:flex"
						>
							<Search className="h-5 w-5 text-gray-600" />
						</Button>

						{/* Notifications */}
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 relative"
						>
							<Bell className="h-5 w-5 text-gray-600" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
						</Button>

						{/* User Menu */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							className="flex items-center space-x-3 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
						>
							<div className="text-right hidden lg:block">
								<p className="text-sm font-medium text-gray-800">
									{username}
								</p>
								<p className="text-xs text-gray-500">
									Administrator
								</p>
							</div>
							<Avatar className="h-9 w-9 border-2 border-gray-200">
								<AvatarImage src={userAvatar} alt={username} />
								<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
									{getUserInitials(username)}
								</AvatarFallback>
							</Avatar>
						</motion.div>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 overflow-auto bg-gray-50">
					<ScrollArea className="h-full">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="p-4 lg:p-6 max-w-[1600px] mx-auto"
						>
							{children}
						</motion.div>
					</ScrollArea>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
