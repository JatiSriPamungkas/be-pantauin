import { getAllWorkers, getTotalWorkers, getWorkerAndTasks } from "../models/workers.js";

export const getTotalWorker = async (req, res) => {
	try {
		const [data] = await getTotalWorkers();

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

export const getAllWorker = async (req, res) => {
	try {
		const [data] = await getAllWorkers();

		res.status(200).json({
			message: "GET: successfully retrieved all workers",
			data: {
				data,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "GET: failed to retrieve all workers",
			error: error.message,
		});
	}
};

export const getWorkerAndTask = async (req, res) => {
	try {
		const [data] = await getWorkerAndTasks();

		res.status(200).json({
			message: "GET: successfully retrieved workers and tasks",
			data: {
				data,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "GET: failed to retrieve all workers and tasks",
			error: error.message,
		});
	}
};
