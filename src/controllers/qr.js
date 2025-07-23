import { createQRCodes, getValidQRCodeToken } from "../models/qr.js";

export const getValidQRCode = async (req, res) => {
	try {
		const token = await getValidQRCodeToken();
		if (!token) {
			return res.status(404).json({ error: "No valid QR code found" });
		}

		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};

export const generateQRCode = async (req, res) => {
	const { token, expired_at } = req.body;

	if (!token || !expired_at) {
		return res.status(400).json({ error: "Token and expiration date are required" });
	}

	try {
		await createQRCodes(token, expired_at);
		res.status(200).json({
			message: "QR code created successfully",
			data: {
				token,
				expired_at,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};
