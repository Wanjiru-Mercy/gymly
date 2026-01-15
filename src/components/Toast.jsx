import React, { createContext, useContext, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within ToastProvider");
	}
	return context;
};

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const showToast = (message, type = "success") => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, message, type }]);

		setTimeout(() => {
			removeToast(id);
		}, 5000);
	};

	const removeToast = (id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
				{toasts.map((toast) => (
					<Alert
						key={toast.id}
						variant={
							toast.type === "error" ? "destructive" : "default"
						}
						className={`relative pr-10 ${
							toast.type === "success"
								? "border-green-500 bg-green-50 text-green-900"
								: ""
						}`}
					>
						{toast.type === "success" ? (
							<CheckCircle2 className="h-4 w-4 text-green-600" />
						) : (
							<XCircle className="h-4 w-4" />
						)}
						<AlertDescription className="ml-2">
							{toast.message}
						</AlertDescription>
						<button
							onClick={() => removeToast(toast.id)}
							className="absolute top-2 right-2 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
						>
							<X className="h-4 w-4" />
						</button>
					</Alert>
				))}
			</div>
		</ToastContext.Provider>
	);
};
