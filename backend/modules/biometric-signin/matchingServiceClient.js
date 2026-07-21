// Client for the fingerprint matching service (planned: SourceAFIS-based,
// running as its own process since SourceAFIS has no Node.js bindings —
// see architecture discussion). This file is the ONLY place the rest of
// the app talks to matching logic, so the matching service can be swapped
// or the whole biometric-signin module extracted without touching callers.
//
// Expected contract once the matching service exists:
//   POST   /enroll             { image } -> { matchingServiceId }
//   POST   /identify           { image } -> { matchingServiceId, score } | { matchingServiceId: null }
//   DELETE /templates/:id      -> 204
//
// `image` is a PNG fingerprint image as it comes off the DigitalPersona
// reader (@digitalpersona/devices, SampleFormat.PngImage): Base64URL
// encoded (RFC 4648 §5 — '-'/'_' alphabet, no padding), NOT standard
// Base64. Decode with a URL-safe decoder (e.g. Java's
// Base64.getUrlDecoder()) before handing the bytes to SourceAFIS.

const MATCHING_SERVICE_URL =
	process.env.MATCHING_SERVICE_URL || "http://localhost:7000";

export async function enrollTemplate(fingerprintImage) {
	const response = await fetch(`${MATCHING_SERVICE_URL}/enroll`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ image: fingerprintImage }),
	});

	if (!response.ok) {
		throw new Error("Matching service enroll failed");
	}

	return response.json();
}

export async function identify(fingerprintImage) {
	const response = await fetch(`${MATCHING_SERVICE_URL}/identify`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ image: fingerprintImage }),
	});

	if (!response.ok) {
		throw new Error("Matching service identify failed");
	}

	return response.json();
}

export async function revokeTemplate(matchingServiceId) {
	const response = await fetch(
		`${MATCHING_SERVICE_URL}/templates/${matchingServiceId}`,
		{ method: "DELETE" }
	);

	if (!response.ok) {
		throw new Error("Matching service revoke failed");
	}
}
