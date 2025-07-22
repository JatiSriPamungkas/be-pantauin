import { getWorkers } from "../models/workers.js";

export const getWorker = async (req, res) => {
	try {
		const [data] = await getWorkers();

		res.status(200).json({
			message: "GET: successfully retrieved workers",
			data: {
				data,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "GET: failed to retrieve workers",
			error: error.message,
		});
	}
};
