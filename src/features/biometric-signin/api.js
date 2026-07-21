const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class BiometricApiService {
	async request(endpoint, options = {}) {
		const url = `${API_URL}/biometric${endpoint}`;
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
			console.error("Biometric API Error:", error);
			throw error;
		}
	}

	async enroll(memberId, fingerprintImage) {
		return this.request("/enroll", {
			method: "POST",
			body: JSON.stringify({ memberId, fingerprintImage }),
		});
	}

	async revokeEnrollment(enrollmentId) {
		return this.request(`/enroll/${enrollmentId}`, {
			method: "DELETE",
		});
	}

	async identify(fingerprintImage, type = "check-in") {
		return this.request("/identify", {
			method: "POST",
			body: JSON.stringify({ fingerprintImage, type }),
		});
	}

	async getCheckIns(params = {}) {
		const queryString = new URLSearchParams(params).toString();
		return this.request(`/checkins${queryString ? `?${queryString}` : ""}`);
	}
}

export default new BiometricApiService();
