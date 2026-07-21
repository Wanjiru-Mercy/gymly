import { useCallback, useRef, useState } from "react";
import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";

// Requires the HID DigitalPersona WebSdk runtime (loaded via <script> in
// index.html) and the DigitalPersona Workstation/ADC client service running
// on this machine, with a U.are.U reader attached.
export function useFingerprintReader() {
	const readerRef = useRef(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const [error, setError] = useState(null);

	const getReader = () => {
		if (!readerRef.current) {
			readerRef.current = new FingerprintReader();
		}
		return readerRef.current;
	};

	const capture = useCallback(() => {
		setIsCapturing(true);
		setError(null);

		const reader = getReader();

		return new Promise((resolve, reject) => {
			const finish = () => {
				reader.off("SamplesAcquired", onSamplesAcquired);
				reader.off("ErrorOccurred", onErrorOccurred);
				reader.stopAcquisition().catch(() => {});
				setIsCapturing(false);
			};

			const onSamplesAcquired = (event) => {
				const [sample] = event.samples;
				finish();
				resolve(sample.Data);
			};

			const onErrorOccurred = () => {
				finish();
				const err = new Error("Fingerprint reader error");
				setError(err.message);
				reject(err);
			};

			reader.on("SamplesAcquired", onSamplesAcquired);
			reader.on("ErrorOccurred", onErrorOccurred);

			reader.startAcquisition(SampleFormat.PngImage).catch((err) => {
				finish();
				setError(err.message);
				reject(err);
			});
		});
	}, []);

	return { capture, isCapturing, error };
}
