import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import "./index.css";
import { ToastProvider } from "./components/Toast.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MemberManagement from "./pages/MemberManagement.jsx";
import EquipmentManagement from "./pages/EquipmentManagement.jsx";
import Services from "./pages/Services.jsx";
import StaffManagement from "./pages/StaffManagement.jsx";
import Billing from "./pages/Billing.jsx";
import Accounting from "./pages/Accounting.jsx";
import Setups from "./pages/Setups.jsx";
import MembershipPlans from "./pages/MembershipPlans.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/dashboard" replace />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/members",
		element: <MemberManagement />,
	},
	{
		path: "/equipment",
		element: <EquipmentManagement />,
	},
	{
		path: "/services",
		element: <Services />,
	},
	{
		path: "/staff",
		element: <StaffManagement />,
	},
	{
		path: "/billing",
		element: <Billing />,
	},
	{
		path: "/accounting",
		element: <Accounting />,
	},
	{
		path: "/setups",
		element: <Setups />,
	},
	{
		path: "/setups/membership-plans",
		element: <MembershipPlans />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ToastProvider>
			<RouterProvider router={router} />
		</ToastProvider>
	</StrictMode>
);
