import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MemberTable from "./MemberTable";
import MemberForm from "./MemberForm";
import MemberDetails from "./MemberDetails";
import { EnrollmentForm } from "@/features/biometric-signin";

// Mock data - replace with API calls later
const mockMembers = [
	{
		id: 1,
		firstName: "John",
		lastName: "Doe",
		gender: "Male",
		phone: "+1 (555) 123-4567",
		email: "john.doe@email.com",
		plan: "Premium Plan",
		startDate: "2024-01-15",
		endDate: "2024-12-15",
		trainer: "Sarah Johnson",
		status: "Active",
	},
	{
		id: 2,
		firstName: "Jane",
		lastName: "Smith",
		gender: "Female",
		phone: "+1 (555) 234-5678",
		email: "jane.smith@email.com",
		plan: "Basic Plan",
		startDate: "2024-02-01",
		endDate: "2024-11-01",
		trainer: "John Smith",
		status: "Active",
	},
	{
		id: 3,
		firstName: "Mike",
		lastName: "Johnson",
		gender: "Male",
		phone: "+1 (555) 345-6789",
		email: "mike.johnson@email.com",
		plan: "VIP Plan",
		startDate: "2023-12-01",
		endDate: "2024-10-01",
		trainer: "Emma Wilson",
		status: "Expiring",
	},
	{
		id: 4,
		firstName: "Emily",
		lastName: "Davis",
		gender: "Female",
		phone: "+1 (555) 456-7890",
		email: "emily.davis@email.com",
		plan: "Student Plan",
		startDate: "2023-06-01",
		endDate: "2024-06-01",
		trainer: "Mike Davis",
		status: "Expired",
	},
	{
		id: 5,
		firstName: "David",
		lastName: "Brown",
		gender: "Male",
		phone: "+1 (555) 567-8901",
		email: "david.brown@email.com",
		plan: "Premium Plan",
		startDate: "2024-03-15",
		endDate: "2025-03-15",
		trainer: "Sarah Johnson",
		status: "Active",
	},
];

const MembersPage = () => {
	const [members, setMembers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("All");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [isBiometricsOpen, setIsBiometricsOpen] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const [editingMember, setEditingMember] = useState(null);
	const [biometricsMember, setBiometricsMember] = useState(null);

	// Load mock data on component mount
	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			setMembers(mockMembers);
		}, 500);
	}, []);

	// Placeholder for future API calls
	const fetchMembers = async () => {
		// TODO: Implement API call
		console.log("Fetching members from API...");
	};

	const addMember = async (memberData) => {
		// TODO: Implement API call
		console.log("Adding member:", memberData);
		const newMember = {
			...memberData,
			id: Date.now(), // Temporary ID generation
		};
		setMembers((prev) => [...prev, newMember]);
	};

	const updateMember = async (memberData) => {
		// TODO: Implement API call
		console.log("Updating member:", memberData);
		setMembers((prev) =>
			prev.map((member) =>
				member.id === editingMember.id
					? { ...memberData, id: member.id }
					: member
			)
		);
	};

	const deleteMember = async (memberId) => {
		// TODO: Implement API call
		console.log("Deleting member:", memberId);
		setMembers((prev) => prev.filter((member) => member.id !== memberId));
	};

	const handleAddMember = () => {
		setEditingMember(null);
		setIsFormOpen(true);
	};

	const handleEditMember = (member) => {
		setEditingMember(member);
		setIsFormOpen(true);
	};

	const handleViewMember = (member) => {
		setSelectedMember(member);
		setIsDetailsOpen(true);
	};

	const handleDeleteMember = (memberId) => {
		if (window.confirm("Are you sure you want to delete this member?")) {
			deleteMember(memberId);
		}
	};

	const handleFormSubmit = (formData) => {
		if (editingMember) {
			updateMember(formData);
		} else {
			addMember(formData);
		}
		setIsFormOpen(false);
		setEditingMember(null);
	};

	const handleFormCancel = () => {
		setIsFormOpen(false);
		setEditingMember(null);
	};

	const handleDetailsClose = () => {
		setIsDetailsOpen(false);
		setSelectedMember(null);
	};

	const handleDetailsEdit = () => {
		setIsDetailsOpen(false);
		setEditingMember(selectedMember);
		setIsFormOpen(true);
	};

	const handleRegisterBiometrics = (member) => {
		setBiometricsMember(member);
		setIsBiometricsOpen(true);
	};

	const handleDetailsRegisterBiometrics = () => {
		setIsDetailsOpen(false);
		handleRegisterBiometrics(selectedMember);
	};

	const handleBiometricsClose = () => {
		setIsBiometricsOpen(false);
		setBiometricsMember(null);
	};

	return (
		<div className="space-y-6">
			{/* Top Bar */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Members
					</h1>
					<p className="text-gray-600 mt-1">
						Manage your gym members and memberships
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
					{/* Search Input */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search members..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 w-full sm:w-64"
						/>
					</div>

					{/* Filter Dropdown */}
					<Select
						value={filterStatus}
						onValueChange={setFilterStatus}
					>
						<SelectTrigger className="w-full sm:w-40">
							<Filter className="h-4 w-4 mr-2" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Status</SelectItem>
							<SelectItem value="Active">Active</SelectItem>
							<SelectItem value="Expiring">Expiring</SelectItem>
							<SelectItem value="Expired">Expired</SelectItem>
						</SelectContent>
					</Select>

					{/* Add Member Button */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<Button onClick={handleAddMember}>
							<Plus className="h-4 w-4 mr-2" />
							Add Member
						</Button>
					</motion.div>
				</div>
			</div>

			{/* Members Table */}
			<MemberTable
				members={members}
				onView={handleViewMember}
				onEdit={handleEditMember}
				onDelete={handleDeleteMember}
				onRegisterBiometrics={handleRegisterBiometrics}
				searchTerm={searchTerm}
				filterStatus={filterStatus}
			/>

			{/* Add/Edit Member Modal */}
			<AnimatePresence>
				{isFormOpen && (
					<Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
						<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
							<div className="p-6">
								<MemberForm
									member={editingMember}
									onSubmit={handleFormSubmit}
									onCancel={handleFormCancel}
									isOpen={isFormOpen}
								/>
							</div>
						</DialogContent>
					</Dialog>
				)}
			</AnimatePresence>

			{/* Member Details Modal */}
			<AnimatePresence>
				{isDetailsOpen && (
					<MemberDetails
						member={selectedMember}
						onClose={handleDetailsClose}
						onEdit={handleDetailsEdit}
						onRegisterBiometrics={handleDetailsRegisterBiometrics}
					/>
				)}
			</AnimatePresence>

			{/* Register Biometrics Modal */}
			<AnimatePresence>
				{isBiometricsOpen && (
					<Dialog open={isBiometricsOpen} onOpenChange={handleBiometricsClose}>
						<DialogContent className="max-w-lg">
							<EnrollmentForm initialMemberEmail={biometricsMember?.email} />
						</DialogContent>
					</Dialog>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MembersPage;
