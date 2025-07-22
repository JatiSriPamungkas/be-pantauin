import { createsPresensi } from "../models/qr.js";

export const createPresensi = async (req, res) => {
	const { worker_id, check_in, status, notes } = req.body;

	try {
		const [data] = await createsPresensi(worker_id, check_in, status, notes);
		res.status(201).json({
			message: "POST: successfully created presensi",
			data: {
				data,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "POST: failed to create presensi",
			error: error.message,
		});
	}
};
