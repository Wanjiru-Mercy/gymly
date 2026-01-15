import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToastProvider } from "@/components/Toast";

const App = () => {
	const location = useLocation();

	return (
		<ToastProvider>
			<div className="min-h-screen bg-background">
				{/* Navigation Header */}
				<header className="border-b">
					<div className="container mx-auto px-4">
						<nav className="flex items-center justify-between h-16">
							<Link
								to="/"
								className="text-2xl font-bold text-primary"
							>
								Gymly
							</Link>

							<div className="flex items-center space-x-6">
								<Link
									to="/"
									className={`text-sm font-medium transition-colors hover:text-primary ${
										location.pathname === "/"
											? "text-primary"
											: "text-muted-foreground"
									}`}
								>
									Home
								</Link>
								<Link
									to="/about"
									className={`text-sm font-medium transition-colors hover:text-primary ${
										location.pathname === "/about"
											? "text-primary"
											: "text-muted-foreground"
									}`}
								>
									About
								</Link>
								<Link
									to="/contact"
									className={`text-sm font-medium transition-colors hover:text-primary ${
										location.pathname === "/contact"
											? "text-primary"
											: "text-muted-foreground"
									}`}
								>
									Contact
								</Link>
								<Button variant="default" size="sm">
									Sign Up
								</Button>
							</div>
						</nav>
					</div>
				</header>

				{/* Main Content */}
				<main>
					<Outlet />
				</main>

				{/* Footer */}
				<footer className="border-t mt-16">
					<div className="container mx-auto px-4 py-8">
						<div className="text-center text-sm text-muted-foreground">
							© 2025 Gymly. All rights reserved.
						</div>
					</div>
				</footer>
			</div>
		</ToastProvider>
	);
};

export default App;
