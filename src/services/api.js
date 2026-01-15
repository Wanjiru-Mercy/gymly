const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiService {
	async request(endpoint, options = {}) {
		const url = `${API_URL}${endpoint}`;
		const config = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Something went wrong");
			}

			return data;
		} catch (error) {
			console.error("API Error:", error);
			throw error;
		}
	}

	// Plans
	async getPlans(params = {}) {
		const queryString = new URLSearchParams(params).toString();
		return this.request(`/plans${queryString ? `?${queryString}` : ""}`);
	}

	async getPlan(id) {
		return this.request(`/plans/${id}`);
	}

	async createPlan(data) {
		return this.request("/plans", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async updatePlan(id, data) {
		return this.request(`/plans/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async deletePlan(id) {
		return this.request(`/plans/${id}`, {
			method: "DELETE",
		});
	}

	// Members
	async getMembers(params = {}) {
		const queryString = new URLSearchParams(params).toString();
		return this.request(`/members${queryString ? `?${queryString}` : ""}`);
	}

	async getMember(id) {
		return this.request(`/members/${id}`);
	}

	async createMember(data) {
		return this.request("/members", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async updateMember(id, data) {
		return this.request(`/members/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async deleteMember(id) {
		return this.request(`/members/${id}`, {
			method: "DELETE",
		});
	}

	// Equipment
	async getEquipment(params = {}) {
		const queryString = new URLSearchParams(params).toString();
		return this.request(
			`/equipment${queryString ? `?${queryString}` : ""}`
		);
	}

	async getEquipmentById(id) {
		return this.request(`/equipment/${id}`);
	}

	async createEquipment(data) {
		return this.request("/equipment", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async updateEquipment(id, data) {
		return this.request(`/equipment/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async deleteEquipment(id) {
		return this.request(`/equipment/${id}`, {
			method: "DELETE",
		});
	}

	// Dashboard
	async getDashboardStats() {
		return this.request("/dashboard/stats");
	}

	async getRecentActivities() {
		return this.request("/dashboard/activities");
	}
}

export default new ApiService();
