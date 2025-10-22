import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import MembersPage from "@/components/members/MembersPage";

const MemberManagement = () => {
	return (
		<DashboardLayout>
			<MembersPage />
		</DashboardLayout>
	);
};

export default MemberManagement;
